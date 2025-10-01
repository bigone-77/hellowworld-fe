import { Button, InlineSvg, TextField } from '@repo/ui/components';

export default function ProblemSearchAndFilter() {
  return (
    <section className='flex items-center gap-x-3'>
      <TextField
        className='!w-[440]'
        iconLeft={<InlineSvg alias='search' className='text-text1 stroke-2' />}
        placeholder='플레이스홀더'
      />
      <Button className='rounded-S size-12' variant='outline_m'>
        <InlineSvg alias='filter' width={20} height={20} />
      </Button>
    </section>
  );
}
