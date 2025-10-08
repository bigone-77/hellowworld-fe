import { Button, InlineSvg, Label } from '@repo/ui/components';

export default function TestHeaderPointAndClose() {
  return (
    <div className='flex h-full items-center gap-x-[9.5]'>
      <div className='text-title-s text-secondary-box-on flex items-center gap-x-[6]'>
        <p className='bg-secondary-box rounded-S inline-flex items-center justify-center px-5 py-[7.5]'>
          250
        </p>
        <span>pt</span>
      </div>
      <Button variant='outline_m' className='rounded-S size-11'>
        <InlineSvg alias='close' />
      </Button>
    </div>
  );
}
