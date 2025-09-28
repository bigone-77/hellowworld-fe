'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Problem } from '@/types/problem';

// 재사용을 위한 뱃지 컴포넌트 (스타일은 아래에서 추가)
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-full px-3 py-1 text-sm font-semibold ${className}`}>
    {children}
  </div>
);

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: 'status',
    header: '상태',
    cell: (info) => {
      const status = info.getValue() as Problem['status'];
      const styleMap = {
        스스로학습: 'bg-yellow-200 text-yellow-800',
        미진행: 'bg-gray-200 text-gray-800',
        레벨부족: 'bg-gray-100 text-gray-400',
      };
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: 'title',
    header: '제목',
  },
  {
    accessorKey: 'language',
    header: '언어',
    cell: (info) => (
      <Badge className='bg-gray-200 text-gray-800'>
        {info.getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'tags',
    header: '태그',
    cell: (info) => (
      <div className='flex gap-1'>
        {(info.getValue() as string[]).map((tag, index) => (
          <Badge key={index} className='bg-gray-100 text-gray-600'>
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'level',
    header: '난이도',
    cell: (info) => (
      <Badge className='bg-gray-200 text-gray-800'>
        {info.getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'points',
    header: '포인트',
    cell: (info) => (
      <Badge className='bg-gray-200 text-gray-800'>
        {info.getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'accuracy',
    header: '오답률',
    cell: (info) => (
      <Badge className='bg-gray-200 text-gray-800'>
        {info.getValue() as string}
      </Badge>
    ),
  },
  {
    id: 'actions', // 데이터에 없는 컬럼이므로 id를 직접 지정
    header: '오답노트',
    cell: ({ row }) => {
      const problem = row.original; // 이 행의 원본 데이터
      const isDisabled = problem.status === '레벨부족';

      return (
        <div className='flex gap-2'>
          <button
            disabled={isDisabled}
            className='rounded-full bg-gray-200 p-2 disabled:bg-gray-100 disabled:text-gray-300'
          >
            ▶
          </button>
          <button
            disabled={isDisabled}
            className={`rounded-full p-2 ${problem.isBookmarked ? 'bg-yellow-400' : 'bg-gray-200'} disabled:bg-gray-100 disabled:text-gray-300`}
          >
            ★
          </button>
        </div>
      );
    },
  },
];
