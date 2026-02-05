import { Container, Title, Text, Loader, Alert, Pagination, Input, Button, Group } from '@mantine/core';
import { IconAlertCircle, IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTutoresFacade } from '@/app/tutores/useTutoresFacade';
import { TutorList } from '@/app/tutores/components/TutorList';
import type { Tutor } from '@/app/tutores/types';

const TutorListPage = () => {
  const navigate = useNavigate();
  const { 
    tutores, 
    isLoading, 
    hasError, 
    currentPage, 
    totalPages, 
    goToPage, 
    searchByNome, 
    nomeSearch 
  } = useTutoresFacade();

  const handleEdit = (tutor: Tutor) => {
    navigate(`/tutores/${tutor.id}/edit`);
  };

  const handleViewDetails = (tutor: Tutor) => {
    navigate(`/tutores/${tutor.id}`);
  };

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

          {/* Search and Create Section */}
          <Group justify="space-between" align="flex-end">
            <Input
              placeholder="Buscar por nome..."
              leftSection={<IconSearch size={18} />}
              value={nomeSearch}
              onChange={(e) => searchByNome(e.target.value)}
              className="flex-1 max-w-md"
              size="md"
            />
            <Button
              leftSection={<IconPlus size={18} />}
              color="green"
              size="md"
              onClick={() => navigate('/tutores/create')}
            >
              Novo Tutor
            </Button>
          </Group>

          {/* Content Section */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader size="lg" color="green" />
            </div>
          ) : hasError ? (
            <Alert icon={<IconAlertCircle size={16} />} title="Erro" color="red">
              Não foi possível carregar os tutores. Tente novamente mais tarde.
            </Alert>
          ) : (
            <>
              <TutorList
                tutores={tutores}
                onEdit={handleEdit}
                onViewDetails={handleViewDetails}
              />
              
              {totalPages > 1 && (
                <div className="flex justify-center pt-4">
                  <Pagination 
                    total={totalPages} 
                    value={currentPage} 
                    onChange={goToPage}
                    size="md"
                    color="green"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TutorListPage;
