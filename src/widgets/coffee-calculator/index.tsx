import AppLayout from '@cloudscape-design/components/app-layout';

import Breadcrumbs from '../../common/Breadcrumbs';
import { Pathname } from '../../routes';
import DhSideNavigation from '../../common/side-navigation';
import CoffeeCalculator from './CoffeeCalculator';

export default function CoffeeCalculatorPage() {
  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={[{ text: 'Coffee Calculator', href: Pathname.CoffeeCalculator }]} />}
      content={<CoffeeCalculator />}
      toolsHide
      navigation={<DhSideNavigation />}
    />
  );
}