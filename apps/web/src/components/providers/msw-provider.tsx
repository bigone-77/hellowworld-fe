'use client';

import { useEffect, useState } from 'react';
import { handlers } from '@/mocks/handlers';

let mswWorker: any = null;

async function initializeMsw() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    if (mswWorker) {
      return mswWorker;
    }

    const { default: worker } = await import('@/mocks/browser');

    await worker.start({
      onUnhandledRequest(request, print) {
        if (request.url.includes('_next')) {
          return;
        }
        if (request.url.includes('res.cloudinary.com')) {
          return;
        }
        print.warning();
      },
    });

    worker.use(...handlers);

    console.log(worker.listHandlers());

    mswWorker = worker;
    return worker;
  }
  return null;
}

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mocksReady, setMocksReady] = useState(false);

  useEffect(() => {
    initializeMsw().then(() => {
      setMocksReady(true);
    });

    return () => {
      if (mswWorker && process.env.NODE_ENV !== 'production') {
        mswWorker.stop();
        mswWorker = null;
      }
    };
  }, []);

  if (!mocksReady) {
    return null;
  }

  return <>{children}</>;
}
