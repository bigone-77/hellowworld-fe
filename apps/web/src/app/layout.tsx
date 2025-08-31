import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import { MSWProvider } from '@/components/providers/msw-provider';
import RQProvider from '@/components/providers/rq-provider';

const pretendard = localFont({
  src: '../../../../packages/tailwind-config/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '헬로월드',
  description: '코딩이 처음이신가요? 재밌게 공부해요!',
};

if (
  process.env.NEXT_RUNTIME === 'nodejs' &&
  process.env.NODE_ENV !== 'production'
) {
  const { server } = require('@/mocks/http');
  server.listen();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={pretendard.className}>
        <MSWProvider>
          <RQProvider>{children}</RQProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
