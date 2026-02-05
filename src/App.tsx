import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import type { AxiosError } from "axios";


const router = createBrowserRouter(createRoutesFromElements(routes));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 500) return failureCount < 2;
        return false;
      },
    },
  },
});


const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
      
      <RouterProvider router={router} />
     
    </QueryClientProvider>
  )
}

export default App;