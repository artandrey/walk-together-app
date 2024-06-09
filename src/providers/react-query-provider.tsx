import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {FC, PropsWithChildren} from 'react';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: false}},
});

export interface ReactQueryProviderProps extends PropsWithChildren {}

export const ReactQueryProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
