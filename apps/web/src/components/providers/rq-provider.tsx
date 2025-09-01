'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const MutatingIndicator = () => {
  const isMutating = useIsMutating();

  if (isMutating === 0) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
      <div className='size-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent'></div>
    </div>
  );
};

const FetchingIndicator = () => {
  const isFetching = useIsFetching();

  if (isFetching === 0) return null;

  return (
    <div className='fixed left-0 top-0 z-50 h-1 w-full'>
      <div className='h-full w-full animate-pulse bg-blue-500'></div>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />

      <MutatingIndicator />
      <FetchingIndicator />
    </QueryClientProvider>
  );
}

export default RQProvider;
