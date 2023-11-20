import { PropsWithChildren, useCallback } from 'react';
import Link, { LinkProps } from '@cloudscape-design/components/link';
import useFollow from './useFollow';

export default function InternalLink({
  children,
  href,
}: PropsWithChildren<Props>) {
  const follow = useFollow();

  const handleFollow = useCallback(
    (event: CustomEvent<LinkProps.FollowDetail>): void => {
      follow({ href, event });
    },
    [follow, href]
  );

  return (
    <Link onFollow={handleFollow} href={href}>
      {children}
    </Link>
  );
}

interface Props {
  href: string;
}
