import Snb from '@repo/ui/layouts/Snb';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='grid h-screen w-full grid-cols-[97px_1fr] overflow-hidden'>
      <Snb />
      <main className='w-full overflow-y-auto p-10'>{children}</main>
    </div>
  );
}
