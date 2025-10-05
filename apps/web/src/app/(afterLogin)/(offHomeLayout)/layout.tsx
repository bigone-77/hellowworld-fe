import { NuqsAdapter } from 'nuqs/adapters/next';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='grid h-screen w-full overflow-hidden p-10'>
      <NuqsAdapter>
        <main className='h-full w-full'>{children}</main>
      </NuqsAdapter>
    </div>
  );
}
