import { PetGrid } from '@/app/pets/components';
import type { Pet } from '@/app/pets/types';

// Mock data - replace with API call later
const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    age: 3,
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
    description: 'Cachorro alegre e brincalhão, adora correr no parque.',
    tutorName: 'João Silva',
    location: 'São Paulo, SP',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Gato',
    breed: 'Siamês',
    age: 2,
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
    description: 'Gata carinhosa que adora dormir e receber carinho.',
    tutorName: 'Maria Santos',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: '3',
    name: 'Thor',
    species: 'Cachorro',
    breed: 'Husky Siberiano',
    age: 4,
    imageUrl: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=400',
    description: 'Cão energético e leal, perfeito para atividades ao ar livre.',
    location: 'Curitiba, PR',
  },
  {
    id: '4',
    name: 'Mia',
    species: 'Gato',
    breed: 'Persa',
    age: 1,
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    description: 'Gatinha tímida e delicada, adora lugares tranquilos.',
    tutorName: 'Carlos Oliveira',
    location: 'Belo Horizonte, MG',
  },
  {
    id: '5',
    name: 'Max',
    species: 'Cachorro',
    breed: 'Labrador',
    age: 5,
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    description: 'Companheiro fiel, ama natação e brincadeiras.',
    tutorName: 'Ana Costa',
    location: 'Porto Alegre, RS',
  },
  {
    id: '6',
    name: 'Nina',
    species: 'Gato',
    breed: 'Maine Coon',
    age: 3,
    imageUrl: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400',
    description: 'Gata majestosa e independente, adora observar pela janela.',
    tutorName: 'Pedro Alves',
    location: 'Brasília, DF',
  },
  {
    id: '7',
    name: 'Bob',
    species: 'Cachorro',
    breed: 'Bulldog Francês',
    age: 2,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    description: 'Cachorrinho compacto e cheio de personalidade.',
    location: 'Fortaleza, CE',
  },
  {
    id: '8',
    name: 'Mel',
    species: 'Gato',
    breed: 'Vira-lata',
    age: 1,
    imageUrl: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400',
    description: 'Gatinha encontrada na rua, muito carinhosa e grata.',
    tutorName: 'Juliana Mendes',
    location: 'Salvador, BA',
  },
  {
    id: '9',
    name: 'Duke',
    species: 'Cachorro',
    breed: 'Pastor Alemão',
    age: 6,
    imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
    description: 'Cão protetor e inteligente, excelente guardião da família.',
    tutorName: 'Roberto Lima',
    location: 'Recife, PE',
  },
  {
    id: '10',
    name: 'Bella',
    species: 'Cachorro',
    breed: 'Poodle',
    age: 4,
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400',
    description: 'Cachorrinha elegante e esperta, adora fazer truques.',
    tutorName: 'Fernanda Rocha',
    location: 'Manaus, AM',
  },
];

const PetsSection = () => {
  const handlePetClick = (pet: Pet) => {
    console.log('Pet clicked:', pet);
    // Navigate to pet details or open modal
  };

  return (
    <section className="w-full bg-background py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <PetGrid pets={mockPets} onPetClick={handlePetClick} />
      </div>
    </section>
  );
};

export default PetsSection;
