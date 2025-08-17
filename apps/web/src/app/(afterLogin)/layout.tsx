import Snb from '@repo/ui/layouts/Snb';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='grid min-h-screen w-full grid-cols-[97px_1fr]'>
      <Snb />
      <main className='w-full'>{children}</main>
    </div>
  );
}
