'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import { Problem, ProblemStatus } from '@/types/problem';

import { Button, InlineSvg, Popover, ToggleButton } from '@repo/ui/components';

import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

const STATUS_CLASS_MAP: Record<ProblemStatus, string> = {
  스스로풀음: 'bg-primary-box text-primary-on border-primary-line',
  미진행: 'bg-surface1 text-text2 border-primary-line',
  도움받음: 'bg-primary-box-var1 text-text2 border-primary-line',
  레벨부족: 'bg-text-box-var text-text1 border-text-line',
};

const CustomCell = ({
  children,
  className,
  status,
}: {
  children: React.ReactNode;
  className?: string;
  status: ProblemStatus;
}) => {
  const statusClassName = STATUS_CLASS_MAP[status];

  return (
    <div
      className={cn(
        'rounded-S !text-body-l2 border px-3 py-[11]',
        statusClassName,
        className,
      )}
    >
      {children}
    </div>
  );
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: 'status',
    header: () => {
      const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);

      return (
        <Popover open={statusPopoverOpen} onOpenChange={setStatusPopoverOpen}>
          <Popover.Trigger>
            <div className='flex cursor-pointer items-center gap-1'>
              <span>상태</span>
              <InlineSvg
                alias='nextArrow'
                width={18}
                height={18}
                className='text-primary-on rotate-90'
              />
            </div>
          </Popover.Trigger>
          <Popover.Content align='start' side='bottom'>
            <Popover.MenuContainer>
              {['미진행', '스스로풀음', '도움받음', '레벨부족'].map(
                (status, index) => (
                  <Popover.MenuItem key={index}>{status}</Popover.MenuItem>
                ),
              )}
            </Popover.MenuContainer>
          </Popover.Content>
        </Popover>
      );
    },
    size: 120,
    cell: (info) => {
      const status = info.getValue() as Problem['status'];
      return <CustomCell status={status}>{status}</CustomCell>;
    },
  },
  {
    accessorKey: 'title',
    header: () => (
      <div className='flex items-center gap-1'>
        <span>제목</span>
        <InlineSvg alias='upAndDown' width={18} height={18} />
      </div>
    ),
    size: 400,
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <CustomCell status={status}>{info.getValue() as string}</CustomCell>
      );
    },
  },
  {
    accessorKey: 'language',
    header: () => {
      const [languagePopoverOpen, setLanguagePopoverOpen] = useState(false);

      return (
        <Popover
          open={languagePopoverOpen}
          onOpenChange={setLanguagePopoverOpen}
        >
          <Popover.Trigger>
            <div className='flex cursor-pointer items-center gap-1'>
              <span>언어</span>
              <InlineSvg
                alias='nextArrow'
                width={18}
                height={18}
                className='text-primary-on rotate-90'
              />
            </div>
          </Popover.Trigger>
          <Popover.Content align='start' side='bottom'>
            <Popover.MenuContainer>
              {['Python3', 'Java', 'Javascript'].map((lang, index) => (
                <Popover.MenuItem key={index}>{lang}</Popover.MenuItem>
              ))}
            </Popover.MenuContainer>
          </Popover.Content>
        </Popover>
      );
    },
    size: 200,
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <CustomCell status={status}>{info.getValue() as string}</CustomCell>
      );
    },
  },
  {
    accessorKey: 'tags',
    header: '태그',
    size: 300,
    cell: (info) => (
      <div className='flex gap-1'>
        {(info.getValue() as string[]).map((tag, index) => (
          <Button key={index} variant='outline_s'>
            {tag}
          </Button>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'level',
    header: () => (
      <div className='flex items-center gap-1'>
        <span>난이도</span>
        <InlineSvg alias='upAndDown' width={18} height={18} />
      </div>
    ),
    size: 160,
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <CustomCell status={status}>{info.getValue() as string}</CustomCell>
      );
    },
  },
  {
    accessorKey: 'points',
    header: () => (
      <div className='flex items-center gap-1'>
        <span>포인트</span>
        <InlineSvg alias='upAndDown' width={18} height={18} />
      </div>
    ),
    size: 160,
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <CustomCell status={status}>{info.getValue() as string}</CustomCell>
      );
    },
  },
  {
    accessorKey: 'accuracy',
    header: () => (
      <div className='flex items-center gap-1'>
        <span>오답률</span>
        <InlineSvg alias='upAndDown' width={18} height={18} />
      </div>
    ),
    size: 160,
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <CustomCell status={status}>{info.getValue() as string}</CustomCell>
      );
    },
  },
  {
    id: 'actions',
    size: 100,
    cell: ({ row }) => {
      const router = useRouter();

      const problem = row.original;
      const isDisabled = problem.status === '레벨부족';

      return (
        <div className='flex h-11 items-stretch gap-x-2'>
          <Button
            variant='primary_icon'
            className='disabled:bg-text-box disabled:border-text-line disabled:text-text-line size-11'
            disabled={isDisabled}
            onClick={() => router.push('/problem-test')}
          >
            <InlineSvg alias='play' />
          </Button>
          <ToggleButton
            variant='primary_icon'
            isOn={false}
            alias='star'
            className='disabled:bg-text-box disabled:border-text-line disabled:text-text-line size-11'
            disabled={isDisabled}
          />
        </div>
      );
    },
  },
];
