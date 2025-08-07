'use client';

import Button from '../components/Button';
import InlineSvg from '../components/InlineSvg';

export default function Snb() {
  return (
    <aside className='bg-surface-var1 flex h-screen max-h-[1024] flex-col items-center justify-between border-[#A48C40] border-r-[0.5] pb-10 pt-5'>
      <div className='flex flex-col items-center gap-y-5'>
        <MenuBtnWrapper>
          <svg
            width='32'
            height='36'
            viewBox='0 0 32 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-primary-box'
          >
            <path
              className='transition-transform duration-200 ease-in-out group-hover:-translate-y-1/2 group-active:-translate-y-1/2'
              d='M3.50428 26.3414C2.46012 26.7979 2.01493 28.054 2.68734 28.9741C3.93789 30.6853 5.57576 32.1429 7.5001 33.2437C10.0644 34.7106 13.0323 35.4838 16.059 35.4736C19.0858 35.4635 22.0473 34.6702 24.5997 33.1861C26.5149 32.0725 28.1408 30.6042 29.3774 28.8848C30.0428 27.9597 29.5884 26.7071 28.5411 26.2578C27.5935 25.8512 26.5064 26.2602 25.8854 27.0833C24.9777 28.2867 23.8112 29.3173 22.4498 30.1089C20.5355 31.222 18.3143 31.8169 16.0443 31.8245C13.7742 31.8322 11.5483 31.2523 9.62507 30.1521C8.25618 29.369 7.08057 28.3453 6.16278 27.1468C5.53662 26.3291 4.44789 25.9287 3.50428 26.3414Z'
              fill='currentColor'
            />
            <rect
              x='18.9475'
              y='0.526093'
              width='4.21053'
              height='21.0526'
              rx='2.10526'
              fill='currentColor'
            />
            <rect
              x='8.56149'
              y='0.526093'
              width='4.49123'
              height='21.0526'
              rx='2.24561'
              fill='currentColor'
            />
          </svg>
        </MenuBtnWrapper>
        <div className='flex flex-col gap-y-[6]'>
          <InlineSvg
            srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1752665741/badge/friends.svg'
            width={44}
            height={44}
          />
          <span className='text-body-l1 text-black'>신태일</span>
        </div>
        <Button variant='primary_icon' size='m'>
          <InlineSvg srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753115575/svg/play.svg' />
        </Button>
      </div>
      <div className='flex flex-col items-center gap-y-6'>
        <MenuBtnWrapper>
          <InlineSvg
            srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/award.svg'
            width={24}
            height={24}
          />
          <span className='text-label-l2 whitespace-nowrap'>명예의 전당</span>
        </MenuBtnWrapper>
        <MenuBtnWrapper>
          <InlineSvg
            srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/solve.svg'
            width={24}
            height={24}
          />
          <span className='text-label-l2 whitespace-nowrap'>문제 풀이</span>
        </MenuBtnWrapper>
        <MenuBtnWrapper disabled>
          <InlineSvg
            srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/board.svg'
            width={24}
            height={24}
          />
          <span className='text-label-l2 whitespace-nowrap'>게시판</span>
        </MenuBtnWrapper>
      </div>
      <div className='flex flex-col items-center gap-y-1'>
        <InlineSvg
          srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753790409/svg/logout.svg'
          width={24}
          height={24}
        />
        <span className='text-label-l2 text-text2'>로그아웃</span>
      </div>
    </aside>
  );
}

const MenuBtnWrapper = ({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type='button'
      disabled={disabled}
      className='text-text2 rounded-S hover:bg-surface2 active:bg-primary-box-var1 disabled:text-text1 group flex w-[73] shrink-0 cursor-pointer flex-col items-center gap-y-1 bg-transparent px-5 py-[6] transition-all duration-200 ease-in-out active:scale-95 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent disabled:active:scale-100 disabled:active:bg-transparent'
    >
      {children}
    </button>
  );
};
