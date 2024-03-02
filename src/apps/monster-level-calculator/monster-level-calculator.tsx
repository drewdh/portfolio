import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';

import useMonsterLevelCalculator from './use-monster-level-calculator';
import ContentLayout from '@cloudscape-design/components/content-layout';

export default function MonsterLevelCalculator() {
  const {
    handleMonsterLevelChange,
    handleSigilTierChange,
    monsterLevelOptions,
    selectedMonsterLevelOption,
    selectedSigilTierOption,
    sigilTierOptions,
  } = useMonsterLevelCalculator();

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Calculate the sigil tier required for your desired monster level, or see what level the monsters are for a specific sigil tier."
        >
          Monster level calculator
        </Header>
      }
    >
      <Container header={<Header>Monster level calculator</Header>}>
        <SpaceBetween size="l">
          <FormField label="Nightmare sigil tier">
            <Select
              selectedOption={selectedSigilTierOption}
              onChange={handleSigilTierChange}
              options={sigilTierOptions}
            />
          </FormField>
          <FormField label="Monster level">
            <Select
              selectedOption={selectedMonsterLevelOption}
              onChange={handleMonsterLevelChange}
              options={monsterLevelOptions}
            />
          </FormField>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
}
