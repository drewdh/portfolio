import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { Pathname } from '../routes';

export default function Breadcrumbs({ items }: Props) {
  const home: BreadcrumbGroupProps.Item = { text: 'Drew Hanberry', href: Pathname.Home };

  return (
    <BreadcrumbGroup items={[home, ...items]} />
  );
}

interface Props {
  items: BreadcrumbGroupProps.Item[];
}
