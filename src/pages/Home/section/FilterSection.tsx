import { Input, Button } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface FilterSectionProps {
  nomeValue: string;
  racaValue: string;
  onSearchNome: (term: string) => void;
  onSearchRaca: (term: string) => void;
}

const FilterSection = ({ nomeValue, racaValue, onSearchNome, onSearchRaca }: FilterSectionProps) => {
  const navigate = useNavigate();

  const handleRegisterPet = () => {
    navigate('/pets/create');
  };

  return (
    <section className="w-full bg-background py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold">
                Conheça Nossos Adoráveis Pets
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Navegue pela nossa coleção de pets maravilhosos esperando por seu tutor perfeito.
              </p>
            </div>
            <Button
              size="lg"
              color="green"
              leftSection={<IconPlus size={20} />}
              onClick={handleRegisterPet}
              className="w-full sm:w-auto whitespace-nowrap"
            >
              Cadastrar Pet
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              size="lg"
              placeholder="Buscar por nome..."
              leftSection={<IconSearch size={20} />}
              value={nomeValue}
              onChange={(e) => onSearchNome(e.target.value)}
              styles={{
                input: {
                  borderRadius: '12px',
                  borderColor: '#E0D6CA',
                },
              }}
            />
            <Input
              size="lg"
              placeholder="Buscar por raça..."
              leftSection={<IconSearch size={20} />}
              value={racaValue}
              onChange={(e) => onSearchRaca(e.target.value)}
              styles={{
                input: {
                  borderRadius: '12px',
                  borderColor: '#E0D6CA',
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
