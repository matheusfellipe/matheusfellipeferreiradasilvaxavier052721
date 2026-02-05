import { Container, Title, Text } from '@mantine/core';

const TutorListPage = () => {
  return (
    <div className="w-full min-h-screen bg-background py-8">
      <Container size="xl">
        <div className="space-y-6">
          <div>
            <Title order={1} className="text-3xl md:text-4xl font-bold mb-2">
              Tutores
            </Title>
            <Text c="dimmed" size="lg">
              Gerencie os tutores responsáveis pelos pets
            </Text>
          </div>

        
          <div className="py-12 text-center">
            <Text size="lg" c="dimmed">
              Lista de tutores em desenvolvimento...
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TutorListPage;
