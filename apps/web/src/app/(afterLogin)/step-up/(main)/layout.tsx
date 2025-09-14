export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-[939fr_405fr] gap-6'>
      <section>{children}</section>
      <aside className='rounded-L bg-white px-6 pt-6'>
        <span className='text-headline-s text-black'>STEP</span>
      </aside>
    </div>
  );
}
