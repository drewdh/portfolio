import Header from '@cloudscape-design/components/header';
import Cards, { CardsProps } from '@cloudscape-design/components/cards';

import useTitle from '../../useTitle';
import { Pathname } from '../../routes';
import InternalLink from '../../common/InternalLink';
import widgetDetails from '../../common/widgetDetails';

interface Widget {
  title: string;
  href: string;
  description: string;
}

const widgets: Widget[] = [
  {
    title: widgetDetails.ecobee.title,
    href: Pathname.Ecobee,
    description: widgetDetails.ecobee.description,
  },
  {
    title: widgetDetails.diablo.title,
    href: Pathname.Diablo,
    description: widgetDetails.diablo.description,
  },
];

const cardDefinition: CardsProps.CardDefinition<Widget> = {
  header: (item) => (
    <InternalLink fontSize="heading-m" href={item.href}>
      {item.title}
    </InternalLink>
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
