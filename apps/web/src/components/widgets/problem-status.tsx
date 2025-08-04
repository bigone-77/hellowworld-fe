import Button from '@repo/ui/components/Button';
import InlineSvg from '@repo/ui/components/InlineSvg';
import Progressbar from '@repo/ui/components/Progressbar';

export default function ProblemStatus() {
  return (
    <section className='rounded-L bg-primary-box-var1 px-6 pt-6'>
      <div className='flex flex-col gap-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-headline-s text-black'>나의 문제 현황</span>
          <Button className='text-text2' variant='text'>
            더보기
            <InlineSvg
              srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/next-arrow.svg'
              width={18}
              height={18}
            />
          </Button>
        </div>
        <p className='flex items-center gap-x-2'>
          <span className='text-label-l2 text-primary-box-var3'>STEP2</span>
          <span className='text-title-l text-text2'>
            왕초보 Python 입문 (3/20)
          </span>
        </p>
        <Progressbar progress={32} />
      </div>
    </section>
  );
}
