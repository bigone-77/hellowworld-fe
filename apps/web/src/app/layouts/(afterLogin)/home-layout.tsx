'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import { Button, InlineSvg, Popover } from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';

export default function HomeLayout() {
  const [popoverOpen, setPopoverOpen] = useState({
    solve: false,
    setting: false,
  });

  const handlePopoverOpenChange = (
    key: 'solve' | 'setting',
    isOpen: boolean,
  ) => {
    setPopoverOpen((prev) => ({ ...prev, [key]: isOpen }));
  };

  return (
    <aside className='bg-surface-var1 flex min-h-svh flex-col items-center justify-between border-[#A48C40] border-r-[0.5] pb-10 pt-5'>
      <div className='flex flex-col items-center gap-y-5'>
        <MenuBtnWrapper>
          <Link href={'/home'}>
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
          </Link>
        </MenuBtnWrapper>
        <div className='flex flex-col gap-y-[6]'>
          <Image
            src={
              'https://res.cloudinary.com/dl31hx4rn/image/upload/v1752665741/badge/friends.svg'
            }
            alt='home-badge'
            width={44}
            height={44}
          />
          <span className='text-body-l1 text-black'>신태일</span>
        </div>
        <Button variant='primary_icon' size='m'>
          <InlineSvg alias='play' />
        </Button>
        <Button variant='secondary_icon' size='m'>
          <InlineSvg
            alias='search'
            className='text-secondary-box-on stroke-2'
          />
        </Button>
      </div>
      <div className='flex flex-col items-center gap-y-6'>
        <MenuBtnWrapper>
          <Image
            src={
              'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/award.svg'
            }
            alt='award'
            width={24}
            height={24}
          />
          <span className='text-label-l2 whitespace-nowrap'>명예의 전당</span>
        </MenuBtnWrapper>

        <Popover
          open={popoverOpen.solve}
          onOpenChange={(isOpen) => handlePopoverOpenChange('solve', isOpen)}
        >
          <Popover.Trigger>
            <MenuBtnWrapper isPopupOpen={popoverOpen.solve}>
              <Image
                src={
                  'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/solve.svg'
                }
                alt='solve'
                width={24}
                height={24}
              />
              <span className='text-label-l2 whitespace-nowrap'>문제 풀이</span>
            </MenuBtnWrapper>
          </Popover.Trigger>
          <Popover.Content align='center' side='right'>
            <Popover.MenuContainer>
              <Popover.MenuItem>
                <Link
                  href='/step-up'
                  onClick={() => handlePopoverOpenChange('solve', false)}
                >
                  <span className='text-text-body-l1'>스텝업 코스</span>
                </Link>
              </Popover.MenuItem>
              <Popover.MenuItem>
                <Link
                  href='/problem'
                  onClick={() => handlePopoverOpenChange('solve', false)}
                >
                  <span className='text-text-body-l1'>문제풀이</span>
                </Link>
              </Popover.MenuItem>
            </Popover.MenuContainer>
          </Popover.Content>
        </Popover>

        <MenuBtnWrapper>
          <Image
            src={
              'https://res.cloudinary.com/dl31hx4rn/image/upload/v1753788512/svg/board.svg'
            }
            alt='solve'
            width={24}
            height={24}
          />
          <span className='text-label-l2 whitespace-nowrap'>게시판</span>
        </MenuBtnWrapper>
      </div>

      <Popover
        open={popoverOpen.setting}
        onOpenChange={() =>
          setPopoverOpen((prev) => ({ ...prev, setting: !popoverOpen.setting }))
        }
      >
        <Popover.Trigger>
          <MenuBtnWrapper isPopupOpen={popoverOpen.setting}>
            <SettingSvg />
            <span className='text-label-l2 text-text2'>설정</span>
          </MenuBtnWrapper>
        </Popover.Trigger>
        <Popover.Content align='end' side='right'>
          <Popover.MenuContainer>
            <Popover.MenuItem>설정</Popover.MenuItem>
            <Popover.MenuItem>위젯설정</Popover.MenuItem>
            <Popover.MenuItem>개인정보처리방침</Popover.MenuItem>
            <Popover.MenuItem>서비스약관</Popover.MenuItem>
            <div className='my-2 h-[1] w-full bg-[#d9d9d9]' />
            <Popover.MenuItem>로그아웃</Popover.MenuItem>
          </Popover.MenuContainer>
        </Popover.Content>
      </Popover>
    </aside>
  );
}

const MenuBtnWrapper = ({
  disabled,
  children,
  isPopupOpen,
}: {
  disabled?: boolean;
  isPopupOpen?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        'text-text2 rounded-S group flex w-[73] shrink-0 cursor-pointer flex-col items-center gap-y-1 bg-transparent px-[11] py-3',
        'transition-all duration-200 ease-in-out active:scale-95 disabled:cursor-default disabled:opacity-50',
        'disabled:hover:bg-transparent disabled:active:scale-100 disabled:active:bg-transparent',
        'hover:bg-surface2 active:bg-primary-box-var1 disabled:text-text1',
        'border border-transparent',
        isPopupOpen && 'bg-yellow-10 border-primary-box',
      )}
    >
      {children}
    </button>
  );
};

// 존나 열받아서 그냥 여기에 적음
const SettingSvg = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.2791 2.152C13.9091 2 13.4391 2 12.5001 2C11.5611 2 11.0921 2 10.7211 2.152C10.477 2.25175 10.255 2.39878 10.0679 2.58465C9.88085 2.77051 9.73239 2.99154 9.63107 3.235C9.53707 3.458 9.50107 3.719 9.48607 4.098C9.47893 4.3725 9.40214 4.64068 9.2629 4.87736C9.12366 5.11403 8.92654 5.31142 8.69007 5.451C8.44882 5.5851 8.17762 5.65615 7.9016 5.65754C7.62558 5.65894 7.35367 5.59065 7.11107 5.459C6.77307 5.281 6.52807 5.183 6.28607 5.151C5.75665 5.08192 5.22134 5.2242 4.79607 5.547C4.47807 5.789 4.24307 6.193 3.77407 7C3.30407 7.807 3.07007 8.21 3.01707 8.605C2.94707 9.131 3.09107 9.663 3.41707 10.084C3.56507 10.276 3.77407 10.437 4.09707 10.639C4.57407 10.936 4.88007 11.442 4.88007 12C4.88007 12.558 4.57407 13.064 4.09807 13.36C3.77407 13.563 3.56507 13.724 3.41607 13.916C3.25564 14.1242 3.13782 14.362 3.06936 14.6158C3.00089 14.8696 2.98313 15.1343 3.01707 15.395C3.07007 15.789 3.30407 16.193 3.77407 17C4.24407 17.807 4.47807 18.21 4.79607 18.453C5.22007 18.776 5.75607 18.918 6.28607 18.849C6.52807 18.817 6.77307 18.719 7.11107 18.541C7.3538 18.4092 7.62589 18.3408 7.9021 18.3422C8.17831 18.3436 8.44969 18.4147 8.69107 18.549C9.17707 18.829 9.46507 19.344 9.48607 19.902C9.50107 20.282 9.53707 20.542 9.63107 20.765C9.83507 21.255 10.2271 21.645 10.7211 21.848C11.0911 22 11.5611 22 12.5001 22C13.4391 22 13.9091 22 14.2791 21.848C14.5232 21.7483 14.7452 21.6012 14.9322 21.4154C15.1193 21.2295 15.2678 21.0085 15.3691 20.765C15.4631 20.542 15.4991 20.282 15.5141 19.902C15.5341 19.344 15.8231 18.828 16.3101 18.549C16.5513 18.4149 16.8225 18.3439 17.0985 18.3425C17.3746 18.3411 17.6465 18.4093 17.8891 18.541C18.2271 18.719 18.4721 18.817 18.7141 18.849C19.2441 18.919 19.7801 18.776 20.2041 18.453C20.5221 18.211 20.7571 17.807 21.2261 17C21.6961 16.193 21.9301 15.79 21.9831 15.395C22.0169 15.1343 21.9989 14.8695 21.9303 14.6157C21.8617 14.3619 21.7437 14.1241 21.5831 13.916C21.4351 13.724 21.2261 13.563 20.9031 13.361C20.4261 13.064 20.1201 12.558 20.1201 12C20.1201 11.442 20.4261 10.936 20.9021 10.64C21.2261 10.437 21.4351 10.276 21.5841 10.084C21.7445 9.87579 21.8623 9.63799 21.9308 9.38422C21.9992 9.13044 22.017 8.86565 21.9831 8.605C21.9301 8.211 21.6961 7.807 21.2261 7C20.7561 6.193 20.5221 5.79 20.2041 5.547C19.7788 5.2242 19.2435 5.08192 18.7141 5.151C18.4721 5.183 18.2271 5.281 17.8891 5.459C17.6463 5.59083 17.3743 5.65922 17.098 5.65782C16.8218 5.65642 16.5504 5.58528 16.3091 5.451C16.0728 5.3113 15.8759 5.11385 15.7368 4.87719C15.5977 4.64052 15.5211 4.37241 15.5141 4.098C15.4991 3.718 15.4631 3.458 15.3691 3.235C15.2678 2.99154 15.1193 2.77051 14.9322 2.58465C14.7452 2.39878 14.5232 2.25175 14.2791 2.152ZM12.5001 15C14.1701 15 15.5231 13.657 15.5231 12C15.5231 10.343 14.1691 9 12.5001 9C10.8311 9 9.47707 10.343 9.47707 12C9.47707 13.657 10.8311 15 12.5001 15Z'
        fill='#1A1C21'
      />
    </svg>
  );
};
