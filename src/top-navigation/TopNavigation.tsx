import CloudscapeTopNavigation from '@cloudscape-design/components/top-navigation';

import styles from './styles.module.scss';
import { topNavId } from './constants';
import useTopNavigation from './useTopNavigation';
import Settings from '../settings';
import Feedback from '../feedback/Feedback';

export default function TopNavigation() {
  const {
    handleFeedbackDismiss,
    handleSettingsDismiss,
    i18nStrings,
    identity,
    isFeedbackVisible,
    isSettingsVisible,
    utilities,
  } = useTopNavigation();

  return (
    <>
      <div className={styles.topNavigation} id={topNavId}>
        <CloudscapeTopNavigation
          identity={identity}
          i18nStrings={i18nStrings}
          utilities={utilities}
        />
      </div>
      <Settings visible={isSettingsVisible} onDismiss={handleSettingsDismiss} />
      <Feedback
        isVisible={isFeedbackVisible}
        onDismiss={handleFeedbackDismiss}
      />
    </>
  );
}
