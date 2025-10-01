import HomeLayout from '@/app/layouts/(afterLogin)/home-layout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='grid h-screen w-full grid-cols-[97px_1fr] overflow-hidden'>
      <HomeLayout />
      <main className='h-full w-full overflow-y-auto p-10'>{children}</main>
    </div>
  );
}
