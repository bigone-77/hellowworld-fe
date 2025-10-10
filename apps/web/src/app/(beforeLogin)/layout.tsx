import Image from 'next/image';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='bg-surface-var1 flex min-h-lvh w-dvw flex-col'>
      <header className='p-10'>
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1755448046/logo/logo.svg`}
          alt='메인로고'
          width={93}
          height={44.42}
        />
      </header>
      <main className='px-logo flex pb-[69]'>
        <div className='flex-center flex-1'>{children}</div>
        <div className='flex-center flex-1'></div>
      </main>
    </div>
  );
}
