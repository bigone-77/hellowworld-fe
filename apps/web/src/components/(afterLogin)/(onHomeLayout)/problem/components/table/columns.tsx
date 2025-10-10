'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import { Problem, ProblemStatus } from '@/types/problem';

import { Button, InlineSvg, Popover, ToggleButton } from '@repo/ui/components';

import { cn } from '@repo/ui/lib/utils';

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

const OverlayContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-center-col rounded-L shadow-modal-s w-full gap-y-2 border border-white/60 bg-white p-2'>
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
            <OverlayContentWrapper>
              {['미진행', '스스로풀음', '도움받음', '레벨부족'].map(
                (status, index) => (
                  <p
                    key={index}
                    className='rounded-L hover:bg-text-box text-text-body-l1 w-[180] cursor-pointer p-4'
                  >
                    {status}
                  </p>
                ),
              )}
            </OverlayContentWrapper>
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
            <OverlayContentWrapper>
              {['Python3', 'Java', 'Javascript'].map((lang, index) => (
                <p
                  key={index}
                  className='rounded-L hover:bg-text-box text-text-body-l1 w-[180] cursor-pointer p-4'
                >
                  {lang}
                </p>
              ))}
            </OverlayContentWrapper>
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
      const problem = row.original;
      const isDisabled = problem.status === '레벨부족';

      return (
        <div className='flex h-11 items-stretch gap-x-2'>
          <Button
            variant='primary_icon'
            className='disabled:bg-text-box disabled:border-text-line disabled:text-text-line size-11'
            disabled={isDisabled}
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
