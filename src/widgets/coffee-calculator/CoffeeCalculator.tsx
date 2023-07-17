import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';

export default function CoffeeCalculator() {
  return (
    <ContentLayout header={<Header variant="h1">Coffee Calculator</Header>}>
      <Container header={<Header>Configuration</Header>}>
      </Container>
    </ContentLayout>
  );
}
