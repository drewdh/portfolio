import HelpPanel from '@cloudscape-design/components/help-panel';
import Header from '@cloudscape-design/components/header';
import ExternalLinkGroup from '../../help-panel/ExternalLinkGroup';

export default function HelpPanelContent() {
  const links = [
    {
      text: 'Pomodoro Technique on Wikipedia',
      href: 'https://wikipedia.org/wiki/Pomodoro_Technique',
    },
  ];

  return (
    <HelpPanel
      footer={<ExternalLinkGroup links={links} />}
      header={<Header variant="h2">Pomodoro timer</Header>}
    >
      <p>A time management tool that uses the Pomodoro Technique to help improve productivity.</p>
    </HelpPanel>
  )
}