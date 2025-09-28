'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender, // flexRender를 import 합니다.
} from '@tanstack/react-table';

import { dummyData, Problem } from '@/types/problem';
import { columns } from './columns';
import { cn } from '@repo/ui/lib/utils';

export default function ProblemTable() {
  const [data] = useState<Problem[]>(() => [...dummyData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='rounded-lg bg-white p-4 shadow'>
      <table className='w-full border-separate border-spacing-y-2'>
        <thead className='text-left text-gray-500'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-2 font-normal'>
                  {/* 헤더 렌더링 */}
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={cn(
                'rounded-lg shadow-sm transition-shadow hover:shadow-md',
                {
                  'bg-yellow-50 text-gray-800': index === 0, // 첫 번째 행 하이라이트
                  'bg-white text-gray-800': index !== 0,
                  'bg-gray-50 text-gray-400':
                    row.original.status === '레벨부족',
                },
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='p-4 align-middle first:rounded-l-lg last:rounded-r-lg'
                >
                  {/* 셀 렌더링 */}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
