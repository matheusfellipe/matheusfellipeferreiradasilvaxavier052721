import { useState } from 'react';
import { usePets } from './usePets';


export const usePetsFacade = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;


  const { data, isLoading, error, refetch } = usePets({
    page,
    size: pageSize,
    search: searchTerm || undefined,
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
    
    
    search: (term: string) => {
      setSearchTerm(term);
      setPage(0); 
    },
    searchTerm,
    
   
    refresh: refetch,
  };
};

