import ProblemBanner from '@/components/(afterLogin)/problem/components/banner';
import ProblemTable from '@/components/(afterLogin)/problem/components/table';

export default function Page() {
  return (
    <div className='flex h-full flex-col'>
      <h1 className='text-text2 text-display-s'>문제풀이</h1>
      <div className='my-5'>
        <ProblemBanner />
      </div>
      <ProblemTable />
    </div>
  );
}
