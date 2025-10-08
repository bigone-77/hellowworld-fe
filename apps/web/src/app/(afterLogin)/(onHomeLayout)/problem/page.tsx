import ProblemBanner from '@/components/(afterLogin)/(onHomeLayout)/problem/components/banner';
import ProblemSearchAndFilter from '@/components/(afterLogin)/(onHomeLayout)/problem/components/search-and-filter';
import ProblemTable from '@/components/(afterLogin)/(onHomeLayout)/problem/components/table';

export default function Page() {
  return (
    <div className='flex h-full flex-col'>
      <h1 className='text-text2 text-display-s'>문제풀이</h1>
      <div className='my-5'>
        <ProblemBanner />
      </div>
      <div className='mb-4 mt-5'>
        <ProblemSearchAndFilter />
      </div>
      <ProblemTable />
    </div>
  );
}
