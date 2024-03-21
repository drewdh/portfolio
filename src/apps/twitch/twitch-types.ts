export interface TwitchApiClientOptions {
  accessToken: string;
  clientId: string;
}
export interface User {
  /** An ID that identifies the user. */
  id: string;
  /** The user's login name. */
  login: string;
  /** The user's display name. */
  display_name: string;
  /**
   * The type of user. Possible values are:
   * - `admin`: Twitch administrator
   * - `global_mod`
   * - `staff`: Twitch staff
   * - `""`: Normal user
   */
  type: string;
  /**
   * The type of broadcaster. Possible values are:
   * - `affiliate`: An [affiliate broadcaster](https://help.twitch.tv/s/article/joining-the-affiliate-program%20target=)
   * - `partner`: A [partner broadcaster](https://help.twitch.tv/s/article/partner-program-overview)
   * - `""`: A normal broadcaster
   */
  broadcaster_type: string;
  /** The user's description of their channel. */
  description: string;
  /** A URL to the user's profile image. */
  profile_image_url: string;
  /** A URL to the user's offline image. */
  offline_image_url: string;
  /**
   * The number of times the user’s channel has been viewed.
   *
   * @deprecated This field has been deprecated. Any data in this field is not valid and should not be used.
   * @see [Get Users API endpoint – “view_count” deprecation](https://discuss.dev.twitch.tv/t/get-users-api-endpoint-view-count-deprecation/37777)
   */
  view_count: number;
  /**
   * The user’s verified email address. The object includes this field only if the user access token includes the __user:read:email__ scope.
   *
   * If the request contains more than one user, only the user associated with the access token that provided consent will include an email address — the email address for all other users will be empty.
   * */
  email?: string;
  /** The UTC date and time that the user’s account was created. The timestamp is in RFC3339 format. */
  created_at: string;
}
export interface GetUsersRequest {
  ids?: string[];
  logins?: string[];
}
export interface GetUsersResponse {
  /** The list of users */
  data: User[];
}
export interface Pagination {
  /** The cursor used to get the next page of results. Set the request’s `nextToken` query parameter to this value. */
  cursor?: string;
}
export interface Stream {
  /** An ID that identifies the stream. You can use this ID later to look up the video on demand (VOD). */
  id: string;
  /** The ID of the user that’s broadcasting the stream. */
  user_id: string;
  /** The user's login name. */
  user_login: string;
  /** The user's display name. */
  user_name: string;
  /** The ID of the category or game being played. */
  game_id: string;
  /** The name of the category or game being played. */
  game_name: string;
  /**
   * The type of stream. Possible values are:
   * - `live`
   *
   * If an error occurs, this field is set to an empty string.
   * */
  type: string;
  /** The stream's title. Is an empty string if not set. */
  title: string;
  /** The number of users watching the stream. */
  viewer_count: number;
  /** The UTC date and time (in RFC3339 format) of when the broadcast began. */
  started_at: string;
  /** The language that the stream uses. This is an ISO 639-1 two-letter language code or `other` if the stream uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). */
  language: string;
  /** A URL to an image of a frame from the last 5 minutes of the stream. Replace the width and height placeholders in the URL (`{width}x{height}`) with the size of the image you want, in pixels. */
  thumbnail_url: string;
  /**
   * The list of tags that apply to the stream. The list contains IDs only when the channel is steaming live. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). The list doesn’t include Category Tags.
   * @deprecated As of February 28, 2023, this field is deprecated and returns only an empty array. If you use this field, please update your code to use the `tags` field.
   * */
  tag_ids: string[];
  /** The tags applied to the stream. */
  tags: string[];
  /** A Boolean value that indicates whether the stream is meant for mature audiences. */
  is_mature: boolean;
}
export interface GetFollowedStreamsRequest {
  /** The ID of the user whose list of followed streams you want to get. This ID must match the user ID in the access token. */
  userId: string;
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 100. */
  pageSize?: number;
  /** The cursor used to get the next page of results. The `pagination` object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  nextToken?: string;
}
export interface GetFollowedStreamsResponse {
  /** The list of live streams of broadcasters that the specified user follows. The list is in descending order by the number of viewers watching the stream. Because viewers come and go during a stream, it’s possible to find duplicate or missing streams in the list as you page through the results. The list is empty if none of the followed broadcasters are streaming live. */
  data: Stream[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: Pagination;
}
export interface GetStreamsRequest {
  /** A user ID used to filter the list of streams. Returns only the streams of those users that are broadcasting. You may specify a maximum of 100 IDs. */
  userIds?: string[];
  /** A user login name used to filter the list of streams. Returns only the streams of those users that are broadcasting. You may specify a maximum of 100 login names. */
  userLogins?: string[];
  /** A game (category) ID used to filter the list of streams. Returns only the streams that are broadcasting the game (category). You may specify a maximum of 100 IDs. */
  gameIds?: string[];
  /**
   * The type of stream to filter the list of streams by. Possible values are:
   * - `all`
   * - `live`
   *
   * The default is all.
   */
  type?: 'all' | 'live' | string;
  /**
   * A language code used to filter the list of streams. Returns only streams that broadcast in the specified language. Specify the language using an ISO 639-1 two-letter language code or `other` if the broadcast uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang).
   *
   * You may specify a maximum of 100 language codes.
   * */
  languages?: string[];
  /** The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20. */
  pageSize?: number;
  /** The cursor used to get the next page of results. The `pagination` object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  nextToken?: string;
}
export interface GetStreamsResponse {
  /** The list of streams */
  data: Stream[];
  /** The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination) */
  pagination: Pagination;
}
export interface GetChatSettingsRequest {
  /** The ID of the broadcaster whose chat settings you want to get. */
  broadcasterId: string;
}
export interface ChatSettings {
  /** The ID of the broadcaster specified in the request. */
  broadcaster_id: string;
  /** A Boolean value that determines whether chat messages must contain only emotes. Is `true` if chat messages may contain only emotes; otherwise, `false`. */
  emote_mode: boolean;
  /**
   * A Boolean value that determines whether the broadcaster restricts the chat room to followers only.
   *
   * Is `true` if the broadcaster restricts the chat room to followers only; otherwise, `false`.
   *
   * See the `follower_mode_duration` field for how long users must follow the broadcaster before being able to participate in the chat room.
   * */
  follower_mode: boolean;
  /** The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room. Is `null` if `follower_mode` is `false`. */
  follower_mode_duration: number;
  /**
   * A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages.
   *
   * Is `true` if the broadcaster applies a delay; otherwise, `false`.
   *
   * See the `slow_mode_wait_time` field for the delay.
   * */
  slow_mode: boolean;
  /**
   * The amount of time, in seconds, that users must wait between sending messages.
   *
   * Is `null` if `slow_mode` is `false`.
   * */
  slow_mode_wait_time: number;
  /**
   * A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.
   *
   * Is `true` if the broadcaster restricts the chat room to subscribers only; otherwise, `false`.
   * */
  subscriber_mode: boolean;
  /**
   * A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.
   *
   * Is `true` if the broadcaster requires unique messages only; otherwise, `false`.
   * */
  unique_chat_mode: boolean;
}
export interface GetChatSettingsResponse {
  /** The list of chat settings. The list contains a single object with all the settings. */
  data: [ChatSettings];
}
export interface GetEmoteSetsRequest {
  /**
   * An ID that identifies the emote set to get. You may specify a maximum of 25 IDs. The response contains only the IDs that were found and ignores duplicate IDs.
   *
   * To get emote set IDs, use the [Get Channel Emotes API](https://dev.twitch.tv/docs/api/reference/#get-channel-emotes).
   */
  emoteSetIds: string[];
}
export interface Images {
  /** A URL to the small version (28px x 28px) of the emote. */
  url_1x: string;
  /** A URL to the medium version (56px x 56px) of the emote. */
  url_2x: string;
  /** A URL to the large version (112px x 112px) of the emote. */
  url_4x: string;
}
export interface Emote {
  /** An ID that uniquely identifies this emote. */
  id: string;
  /** The name of the emote. This is the name that viewers type in the chat window to get the emote to appear */
  name: string;
  /** The image URLs for the emote. These image URLs always provide a static, non-animated emote image with a light background.

   __NOTE__: You should use the templated URL in the `template` field to fetch the image instead of using these URLs. */
  images: Images;
  /** The type of emote. The possible values are:
   - `bitstier` — A Bits tier emote.
   - `follower` — A follower emote.
   - `subscriptions` — A subscriber emote. */
  emote_type: 'bitstier' | 'follower' | 'subscriptions' | string;
  /** An ID that identifies the emote set that the emote belongs to. */
  emote_set_id: string;
  /** The ID of the broadcaster who owns the emote. */
  owner_id: string;
  /**
   * The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only static. But if the emote is available as a static PNG and an animated GIF, the array contains static and animated. The possible formats are:
   * - `animated`: An animated GIF is available for this emote.
   * - `static`: A static PNG file is available for this emote.
   * */
  format: ('animated' | 'static')[];
  /**
   * The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0. Possible sizes are:
   * - `1.0`: A small version (28px x 28px) is available.
   * - `2.0`: A medium version (56px x 56px) is available.
   * - `3.0`: A large version (112px x 112px) is available.
   */
  scale: ('1.0' | '2.0' | '3.0')[];
  /**
   * The background themes that the emote is available in. Possible themes are:
   * - `dark`
   * - `light`
   */
  theme_mode: ('light' | 'dark')[];
}
export interface GetEmoteSetsResponse {
  /** A templated URL. Use the values from the `id`, `format`, `scale`, and `theme_mode` fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL format](https://dev.twitch.tv/docs/irc/emotes#cdn-template). You should use this template instead of using the URLs in the `images` object. */
  template: string;
  /** The list of emotes found in the specified emote sets. The list is empty if none of the IDs were found. The list is in the same order as the set IDs specified in the request. Each set contains one or more emoticons. */
  data: Emote[];
}
export interface Transport {
  /**
   * The transport method. Possible values are:
   * - `webhook`
   * - `websocket`
   * - `conduit`
   * */
  method: 'webhook' | 'websocket' | 'conduit' | string;
}
export interface CreateEventSubSubscriptionRequest {
  /** The type of subscription to create. For a list of subscriptions that you can create, see [Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#subscription-types). Set this field to the value in the __Name__ column of the Subscription Types table. */
  type: string;
  /** The version number that identifies the definition of the subscription type that you want the response to use. */
  version: number;
  /** A JSON object that contains the parameter values that are specific to the specified subscription type. For the object’s required and optional fields, see the subscription type’s documentation. */
  condition: object;
  /** The transport details that you want Twitch to use when sending you notifications. */
  transport: Transport;
}
// TODO: This is incomplete
export interface Subscription {
  /** An ID that identifies the subscription. */
  id: string;
  /**
   * The subscription’s status. The subscriber receives events only for enabled subscriptions. Possible values are:
   * - `enabled`: The subscription is enabled.
   * - `webhook_callback_verification_pending`: The subscription is pending verification of the specified callback URL (see [Responding to a challenge request](https://dev.twitch.tv/docs/eventsub/handling-webhook-events#responding-to-a-challenge-request)).
   *
   * */
  status: 'enabled' | 'webhook_callback_verification_pending' | string;
  /** The subscription’s type. See [Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#subscription-types). */
  type: string;
  /** The version number that identifies this definition of the subscription’s data. */
  version: string;
  /** The subscription’s parameter values. This is a string-encoded JSON object whose contents are determined by the subscription type. */
  condition: object;
}
export interface CreateEventSubSubscriptionResponse {
  data: [Subscription];
}
export interface DeleteEventSubSubscriptionRequest {
  /** The ID of the subscription to delete. */
  id: string;
}
export interface DeleteEventSubSubscriptionResponse {}
export interface WelcomeMessage {
  metadata: {
    messageId: string;
    messageTimestamp: string;
    message_type: 'session_welcome';
  };
  payload: {
    session: {
      id: string;
      connected_at: string;
      keepalive_timeout_seconds: number;
      reconnect_url: string | null;
      status: string;
    };
  };
}
export interface ChatMessage {
  metadata: {
    messageId: string;
    messageTimestamp: string;
    message_type: 'notification';
  };
  payload: {
    event: {
      badges: Array<{
        set_id: string;
        id: string;
        info: string;
      }>;
      broadcaster_user_id: string;
      broadcaster_user_login: string;
      broadcaster_user_name: string;
      chatter_user_id: string;
      chatter_user_login: string;
      chatter_user_name: string;
      color: string;
      message: {
        fragments: Fragment[];
        text: string;
      };
      message_id: string;
      message_type: 'text';
      reply: null;
    };
  };
}
export interface EmoteFragment {
  /** An ID that uniquely identifies this emote. */
  id: string;
  /** An ID that identifies the emote set that the emote belongs to. */
  emote_set_id: string;
  /** The ID of the broadcaster who owns the emote. */
  owner_id: string;
  /**
   * The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only static. But if the emote is available as a static PNG and an animated GIF, the array contains static and animated. The possible formats are:
   * - `animated`: An animated GIF is available for this emote.
   * - `static`: A static PNG file is available for this emote.
   */
  format: ('animated' | 'static')[];
}
export interface Fragment {
  type: 'text' | 'cheermote' | 'emote' | 'mention';
  text: string;
  emote?: EmoteFragment;
}
export interface GetChannelFollowersRequest {
  /** The broadcaster’s ID. Returns the list of users that follow this broadcaster. */
  broadcaster_id: string;
  /**
   * A user’s ID. Use this parameter to see whether the user follows this broadcaster. If specified, the response contains this user if they follow the broadcaster. If not specified, the response contains all users that follow the broadcaster.
   *
   * Using this parameter requires both a user access token with the moderator:read:followers scope and the user ID in the access token match the broadcaster_id or be the user ID for a moderator of the specified broadcaster.
   * */
  user_id?: string;
}
export interface GetChannelFollowersResponse {
  total: number;
}
