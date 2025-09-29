'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
} from '@tanstack/react-table';

import { dummyData, Problem } from '@/types/problem';
import { columns } from './columns';

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
    <div className='w-full'>
      <div className='bg-surface2 rounded-S flex gap-x-3'>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <div
              key={header.id}
              className='text-body-l1 px-3 py-[14]'
              style={{ width: header.getSize() }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          )),
        )}
      </div>

      <div className='my-2 flex flex-col gap-y-3'>
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className='flex gap-x-3'>
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className='p-0 align-middle'
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
