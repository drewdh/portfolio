import { InfiniteData, useInfiniteQuery, useQuery, UseQueryOptions } from '@tanstack/react-query';

function getCommonHeaders() {
  const accessToken = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${accessToken}`,
    'Client-Id': 'w9wdgvpv3h3m957julwgkn25hxsr38',
  };
}

export enum QueryKey {
  GetFollowedStreams = 'GetFollowedStreams',
  GetUser = 'GetUser',
  GetUserStream = 'GetUserStream',
}

export interface User {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email?: string;
  created_at: string;
}
export interface GetUserResponse {
  data: User[];
}
async function getUser(userName?: string): Promise<User> {
  const resp = await fetch(`https://api.twitch.tv/helix/users?${userName && 'login=' + userName}`, {
    method: 'GET',
    headers: getCommonHeaders(),
  });
  const respBody: GetUserResponse = await resp.json();
  return respBody.data[0];
}
/** If no user ID is provided, the logged-in user is returned */
export function useGetUser(userName?: string) {
  return useQuery({
    queryFn: () => getUser(userName),
    queryKey: [QueryKey.GetUser, userName ?? 'self'],
  });
}

interface Pagination {
  cursor?: string;
}
interface Stream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
}
export interface GetFollowedStreamsRequest {
  userId: string;
  /** Minimum of 1, maximum of 100 */
  pageSize?: number;
  nextToken?: string;
}
export interface GetFollowedStreamsResponse {
  data: Stream[];
  pagination: Pagination;
}
async function getFollowedStreams(
  request: GetFollowedStreamsRequest
): Promise<GetFollowedStreamsResponse> {
  const searchParams = new URLSearchParams({
    user_id: request.userId,
    first: String(request.pageSize) ?? '',
    after: request.nextToken ?? '',
  });
  const resp = await fetch(
    `https://api.twitch.tv/helix/streams/followed?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: getCommonHeaders(),
    }
  );
  const respBody = await resp.json();
  console.log(respBody);
  return respBody;
}

export function useGetFollowedStreams() {
  const { data: user } = useGetUser();
  return useInfiniteQuery<
    GetFollowedStreamsResponse,
    Error,
    InfiniteData<GetFollowedStreamsResponse>,
    [string],
    string | undefined
  >({
    queryFn: ({ pageParam }) =>
      getFollowedStreams({ userId: user!.id, nextToken: pageParam, pageSize: 20 }),
    queryKey: [QueryKey.GetFollowedStreams],
    getNextPageParam: (lastPage) => lastPage.pagination.cursor,
    initialPageParam: undefined,
    enabled: !!user,
  });
}

interface GetStreamsRequest {
  userIds?: string[];
  userLogins?: string[];
  gameIds?: string[];
  type?: 'all' | 'live' | string;
  languages?: string[];
  pageSize?: number;
  nextToken?: string;
}
interface GetStreamsResponse {
  data: Stream[];
  pagination: Pagination;
}
async function getStreams(request: GetStreamsRequest): Promise<GetStreamsResponse> {
  const searchParams = new URLSearchParams();
  request.userIds?.forEach((userId) => searchParams.append('user_id', userId));
  request.userLogins?.forEach((userLogin) => searchParams.append('user_login', userLogin));
  request.gameIds?.forEach((gameId) => searchParams.append('game_id', gameId));
  request.languages?.forEach((language) => searchParams.append('language', language));
  request.type && searchParams.set('type', request.type);
  request.pageSize && searchParams.set('first', String(request.pageSize));
  request.nextToken && searchParams.set('after', request.nextToken);

  const resp = await fetch(`https://api.twitch.tv/helix/streams?${searchParams.toString()}`, {
    method: 'GET',
    headers: getCommonHeaders(),
  });
  return resp.json();
}

type SafeOptions = Omit<UseQueryOptions<GetStreamsResponse>, 'queryFn' | 'queryKey' | 'enabled'>;
export function useGetStreamByUserLogin(userLogin?: string, options: SafeOptions = {}) {
  return useQuery({
    queryFn: () => getStreams({ userLogins: [userLogin!] }),
    queryKey: [QueryKey.GetUserStream, userLogin],
    enabled: !!userLogin,
    ...options,
  });
}
