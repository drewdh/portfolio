import DhAppLayout from 'common/dh-app-layout';
import TwitchComponent from './twitch';

export default function TwitchPage() {
  return (
    <DhAppLayout navigationHide toolsHide disableContentPaddings content={<TwitchComponent />} />
  );
}
