import '@cloudscape-design/global-styles/index.css';
import { Outlet } from 'react-router';

import TopNavigation from '../top-navigation';
import Footer from '../footer/footer';

export default function App() {
  return (
    <>
      <TopNavigation />
      <Outlet />
      <Footer />
    </>
  );
}
