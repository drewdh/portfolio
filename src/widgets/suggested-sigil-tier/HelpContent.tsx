import HelpPanel from '@cloudscape-design/components/help-panel';
import Header from '@cloudscape-design/components/header';

export default function HelpContent() {
  return (
    <HelpPanel
      header={<Header>Suggested sigil tier</Header>}
    >
      <p>The suggested sigil tier maximizes bonus XP from killing higher-level monsters. Monsters 3 levels higher than player level grant the maximum bonus XP of 25%. Monsters more than 3 levels higher grant more base XP but no additional bonus XP.</p>
    </HelpPanel>
  )
}