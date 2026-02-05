import { useState } from 'react';
import { useTutores } from './useTutores';

export const useTutoresFacade = () => {
  const [page, setPage] = useState(0);
  const [nomeSearch, setNomeSearch] = useState('');
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useTutores({
    page,
    size: pageSize,
    ...(nomeSearch && { nome: nomeSearch }),
  });

  return {
    // Data
    tutores: data?.content || [],
    
    // Loading & Error states
    isLoading,
    hasError: !!error,
    
    // Pagination info (convert from 0-based to 1-based for UI)
    currentPage: page + 1,
    totalPages: data?.pageCount || 0,
    totalTutores: data?.total || 0,
    
    // Pagination controls (convert from 1-based to 0-based for API)
    goToPage: (newPage: number) => setPage(newPage - 1),
    nextPage: () => setPage((prev) => Math.min(prev + 1, (data?.pageCount || 1) - 1)),
    previousPage: () => setPage((prev) => Math.max(prev - 1, 0)),
    
    // Search
    searchByNome: (term: string) => {
      setNomeSearch(term);
      setPage(0);
    },
    nomeSearch,
    
    // Refresh
    refresh: refetch,
  };
};
