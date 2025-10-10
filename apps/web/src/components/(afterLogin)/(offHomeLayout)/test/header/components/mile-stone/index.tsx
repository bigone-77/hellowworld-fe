import { cn } from '@repo/ui/lib/utils';

interface Props {
  courseIdx?: string;
  courseTitle?: string;
}

export default function TestHeaderMileStone({
  courseIdx = '00',
  courseTitle = '사전문제풀이',
}: Props) {
  return (
    <div
      className={cn(
        'rounded-S border-text-line text-body-l2 flex w-[235] items-center gap-x-4 border p-3',
        courseIdx === '00' && 'bg-text-box border-text-line text-text-line',
      )}
    >
      <span>{courseIdx}</span>
      <span>{courseTitle}</span>
    </div>
  );
}
