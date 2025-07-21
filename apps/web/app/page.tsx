'use client';

import Button from '@repo/ui/components/Button';
import InlineSvg from '@repo/ui/components/InlineSvg';

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-20'>
      <p className='text-primary-box'>hi</p>
      <Button variant='primary' size='xs'>
        <InlineSvg
          srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753116454/svg/star.svg'
          className='text-yellow-30'
        />
        버튼
      </Button>
      <Button variant='secondary' size='xl'>
        버튼
      </Button>
      <Button variant='text'>버튼</Button>
      <Button variant='outline'>버튼</Button>
      <Button variant='secondary_icon' size='s'>
        <InlineSvg
          srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753116454/svg/star.svg'
          className='text-yellow-30'
        />
      </Button>
    </main>
  );
}
