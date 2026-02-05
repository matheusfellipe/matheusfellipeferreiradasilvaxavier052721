import { Loader } from '@mantine/core';

export const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader size="lg" color="green" />
  </div>
);
