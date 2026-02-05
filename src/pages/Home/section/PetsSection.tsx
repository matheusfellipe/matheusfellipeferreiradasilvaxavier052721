import { PetGrid } from '@/app/pets/components';
import type { Pet } from '@/app/pets/types';
import { Pagination, Loader, Alert } from '@mantine/core';
import { usePetsFacade } from '@/app/pets/usePetsFacade';
import { IconAlertCircle } from '@tabler/icons-react';
import FilterSection from './FilterSection';

const PetsSection = () => {
  const { pets, isLoading, hasError, currentPage, totalPages, goToPage, searchByNome, searchByRaca, nomeSearch, racaSearch } = usePetsFacade();

  const handlePetClick = (pet: Pet) => {
    console.log('Pet clicked:', pet);
    // Navigate to pet details or open modal
  };

  return (
    <>
      <FilterSection 
        nomeValue={nomeSearch} 
        racaValue={racaSearch}
        onSearchNome={searchByNome}
        onSearchRaca={searchByRaca}
      />
      <section id="pets-section" className="w-full bg-background py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader size="lg" color="green" />
          </div>
        ) : hasError ? (
          <Alert icon={<IconAlertCircle size={16} />} title="Erro" color="red">
            Não foi possível carregar os pets. Tente novamente mais tarde.
          </Alert>
        ) : (
          <>
            <PetGrid pets={pets} onPetClick={handlePetClick} />
            
            {totalPages > 1 && (
              <div className="flex justify-center">
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
      </section>
    </>
  );
};

export default PetsSection;
