import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { usePets } from './usePets';


export const usePetsFacade = () => {
  const [page, setPage] = useState(0);
  const [nomeSearch, setNomeSearch] = useState('');
  const [racaSearch, setRacaSearch] = useState('');
  const pageSize = 10;

  // Debounce search terms to avoid excessive API calls
  const [debouncedNome] = useDebouncedValue(nomeSearch, 500);
  const [debouncedRaca] = useDebouncedValue(racaSearch, 500);

  const { data, isLoading, error, refetch } = usePets({
    page,
    size: pageSize,
    ...(debouncedNome && { nome: debouncedNome }),
    ...(debouncedRaca && { raca: debouncedRaca }),
  });

  
  return {
   
    pets: data?.content || [],
    

    isLoading,
    hasError: !!error,
    
   
    currentPage: page + 1, 
    totalPages: data?.pageCount || 0,
    totalPets: data?.total || 0,
    
    
    goToPage: (newPage: number) => setPage(newPage - 1), 
    nextPage: () => setPage((prev) => Math.min(prev + 1, (data?.pageCount || 1) - 1)),
    previousPage: () => setPage((prev) => Math.max(prev - 1, 0)),
    
    
    searchByNome: (term: string) => {
      setNomeSearch(term);
      setPage(0); 
    },
    searchByRaca: (term: string) => {
      setRacaSearch(term);
      setPage(0);
    },
    nomeSearch,
    racaSearch,
    
   
    refresh: refetch,
  };
};

