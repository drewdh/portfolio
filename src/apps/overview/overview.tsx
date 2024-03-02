import Header from '@cloudscape-design/components/header';
import Cards, { CardsProps } from '@cloudscape-design/components/cards';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Popover from '@cloudscape-design/components/popover';

import useTitle from '../../utilities/use-title';
import { Pathname } from '../../routes';
import InternalLink from '../../common/internal-link';
import widgetDetails from '../../common/widget-details';

interface Widget {
  title: string;
  href: string;
  description: string;
  isPrototype?: boolean;
}

const widgets: Widget[] = [
  {
    title: widgetDetails.ecobee.title,
    href: Pathname.Ecobee,
    description: widgetDetails.ecobee.description,
    isPrototype: true,
  },
  {
    title: widgetDetails.diablo.title,
    href: Pathname.Diablo,
    description: widgetDetails.diablo.description,
  },
  {
    title: widgetDetails.feedback.title,
    href: Pathname.Feedback,
    description: widgetDetails.feedback.description,
  },
];

const cardDefinition: CardsProps.CardDefinition<Widget> = {
  header: (item) => (
    <SpaceBetween size="xs" direction="horizontal">
      <InternalLink fontSize="heading-m" href={item.href}>
        {item.title}
      </InternalLink>
      {item.isPrototype && (
        <Box color="text-status-info" display="inline">
          <Popover
            header="Preview app"
            size="medium"
            triggerType="text"
            renderWithPortal
            content="This app is in preview. Functionality is limited and can change at any time."
          >
            <Box fontSize="body-s" color="text-status-info" fontWeight="bold">
              Preview
            </Box>
          </Popover>
        </Box>
      )}
    </SpaceBetween>
  ),
  sections: [{ content: (item) => item.description }],
};

export default function Overview() {
  useTitle();

  return (
    <Cards<Widget>
      header={
        <Header
          description="Mini apps for experimenting with different user experience ideas and technologies."
          variant="awsui-h1-sticky"
        >
          Apps
        </Header>
      }
      items={widgets}
      cardDefinition={cardDefinition}
      variant="full-page"
      stickyHeader
    />
  );
}
