import { Input, Button } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
          
          <Input
            size="lg"
            placeholder="Buscar por nome, especialidade, localização..."
            leftSection={<IconSearch size={20} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            styles={{
              input: {
                borderRadius: '12px',
                borderColor: '#E0D6CA',
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
