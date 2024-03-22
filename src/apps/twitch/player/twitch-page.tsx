import DhAppLayout from 'common/dh-app-layout';
import TwitchComponent from './twitch';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import widgetDetails from 'common/widget-details';
import { Pathname } from 'utilities/routes';
import useTitle from 'utilities/use-title';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

export default function TwitchPage() {
  useTitle(widgetDetails.twitch.title);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useParams();
  const [disableContentPaddings, setDisableContentPaddings] = useState<boolean>(false);

  useEffect(() => {
    const refCurrent = ref.current;
    if (!refCurrent) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDisableContentPaddings(width < 688);
    });
    resizeObserver.observe(refCurrent);
    return () => resizeObserver.unobserve(refCurrent);
  }, []);

  return (
    <div ref={ref}>
      <DhAppLayout
        toolsHide
        breadcrumbs={
          <DhBreadcrumbs
            items={[
              { text: widgetDetails.twitch.title, href: Pathname.Twitch },
              { text: user ?? '', href: `/twitch/${user}` },
            ]}
          />
        }
        disableContentPaddings={disableContentPaddings}
        maxContentWidth={1700}
        contentType="wizard"
        content={<TwitchComponent />}
      />
    </div>
  );
}
