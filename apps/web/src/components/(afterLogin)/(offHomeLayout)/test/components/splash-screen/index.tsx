'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  easeOut,
  easeInOut,
} from 'framer-motion';

import TestHeaderMileStone from '@/components/(afterLogin)/(offHomeLayout)/test/components/header/mile-stone';
import SplashHelpMessage from '@/components/(afterLogin)/(offHomeLayout)/test/components/splash-screen/help-message';
import SplashLoadingCircle from '@/components/(afterLogin)/(offHomeLayout)/test/components/splash-screen/loading-circle';

import { TestHeaderHeight } from '@/config/layout';
import { Button, InlineSvg, Modal } from '@repo/ui/components';
import { IconAlias } from '@repo/ui/config/icon';
import { cn } from '@repo/ui/lib/utils';

const HELPER_MESSAGES = [
  {
    id: 1,
    progressTarget: 10,
    icon: 'aim',
    text: '이번 테스트 결과가 나의 코딩 스텝업 코스 단계를 결정해요',
    bold: '나의 코딩 스텝업 코스 단계',
  },
  {
    id: 2,
    progressTarget: 30,
    icon: 'solve',
    text: '맞춤 학습 경로 설계를 위해 현재 실력 그대로 솔직하게 임해주세요',
    bold: '실력 그대로',
  },
  {
    id: 3,
    progressTarget: 70,
    icon: 'book',
    text: '솔직함이 최고의 학습 효과를 만들어줄 거예요',
    bold: '솔직함',
  },
] as {
  id: number;
  progressTarget: number;
  icon: IconAlias;
  text: string;
  bold: string;
}[];

type SplashScreenProps = {
  onTestStart: () => void;
};

export function SplashScreen({ onTestStart }: SplashScreenProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const [activeMessageCount, setActiveMessageCount] = useState(0);

  const progress = useMotionValue(0);

  useEffect(() => {
    const animationStages: { target: number; duration: number; ease: any }[] = [
      { target: 10, duration: 2.5, ease: easeInOut },
      { target: 30, duration: 2, ease: easeInOut },
      { target: 70, duration: 2, ease: easeOut },
      { target: 90, duration: 1, ease: easeInOut },
      { target: 100, duration: 0.5, ease: easeOut },
    ];

    const controller = new AbortController();
    const { signal } = controller;

    const startAnimations = async () => {
      let messageIndex = 0;

      for (const stage of animationStages) {
        if (signal.aborted) return;

        await animate<number>(progress, stage.target, {
          duration: stage.duration,
          ease: stage.ease,
          onComplete: () => {
            const nextMessage = HELPER_MESSAGES[messageIndex];
            if (nextMessage && stage.target === nextMessage.progressTarget) {
              setActiveMessageCount((prev) => prev + 1);
              messageIndex++;
            }
          },
        }).then(() => {
          return new Promise((resolve) => setTimeout(resolve, 100));
        });
      }

      if (!signal.aborted) {
        setIsAnimationFinished(true);
      }
    };

    startAnimations();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='flex h-full flex-col'>
      <header
        className={cn(
          'flex w-full items-center justify-between gap-x-6',
          `h-${TestHeaderHeight}`,
        )}
      >
        <TestHeaderMileStone />
        <Button
          variant='outline_m'
          className='rounded-S size-11'
          onClick={() => setShowModal(true)}
        >
          <InlineSvg alias='close' />
        </Button>
      </header>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <div className='flex-center-col'>
                <div className='flex-center size-[200]'>
                  <InlineSvg alias='error' width={80} height={80} />
                </div>
                <span>사전 테스트 나가기</span>
              </div>
            </Modal.Title>
            <Modal.Description>
              지금 나가면 진행중인 내용은 저장되지 않아요
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <div className='flex-center-col gap-y-3'>
              <Button
                variant='danger'
                className='px-12'
                onClick={() => router.replace('/home')}
              >
                나가기
              </Button>
              <Button variant='text' onClick={() => setShowModal(false)}>
                취소
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <div className='mt-[26] min-h-0 flex-1'>
        <div className='rounded-L bg-secondary-box-var2 flex size-full flex-col px-5 pt-[66]'>
          <div className='mb-16 min-h-0 flex-1'>
            <main className='bg-surface-var2 rounded-L flex-center-col size-full gap-y-6'>
              <SplashLoadingCircle progress={progress} />

              <p className='text-headline-l'>
                {!isAnimationFinished
                  ? '나에게 맞는 테스트를 만들고 있어요...'
                  : '이제 테스트를 시작해볼까요?'}
              </p>

              <motion.div
                className='flex flex-col items-center gap-y-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {HELPER_MESSAGES.slice(0, activeMessageCount).map((msg) => (
                  <SplashHelpMessage
                    key={msg.id}
                    icon={msg.icon}
                    text={msg.text}
                    bold={msg.bold}
                  />
                ))}
              </motion.div>
            </main>
          </div>

          <div className='relative flex -translate-y-8 justify-end'>
            {isAnimationFinished && (
              <div className='absolute bottom-full right-0 mr-3 animate-bounce'>
                <StartTooltipSvg />
              </div>
            )}

            <Button
              disabled={!isAnimationFinished}
              onClick={onTestStart}
              className='relative z-10'
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const StartTooltipSvg = () => {
  return (
    <svg
      width='189'
      height='73'
      viewBox='0 0 189 73'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_dd_2820_41976)'>
        <path
          d='M8 16C8 10.4772 12.4772 6 18 6H167C172.523 6 177 10.4772 177 16V42C177 47.5228 172.523 52 167 52H18C12.4772 52 8 47.5228 8 42V16Z'
          fill='white'
          shapeRendering='crispEdges'
        />
        <path
          d='M36.9922 26.0293C36.9785 28.2646 38.332 30.5205 40.2324 31.3613L39.4531 32.3867C38.0449 31.7168 36.9307 30.3428 36.3564 28.668C35.7891 30.4658 34.6611 31.9424 33.1914 32.6602L32.3984 31.5664C34.3262 30.7119 35.6797 28.3672 35.6797 26.0293V23.9375H36.9922V26.0293ZM41.3398 35.1895V22.9121H42.6387V35.1895H41.3398ZM48.523 25.1133C48.5162 26.6787 49.6031 28.1621 51.4762 28.791L50.8199 29.8027C49.4322 29.3242 48.4137 28.3672 47.8805 27.1641C47.3473 28.4834 46.2809 29.5293 44.8453 30.0352L44.148 29.0234C46.0621 28.374 47.2174 26.7881 47.2242 25.0996V24.7715H44.5309V23.7188H51.1617V24.7715H48.523V25.1133ZM45.775 31.9492V30.8965H53.8687V35.1621H52.5699V31.9492H45.775ZM52.5699 30.2949V22.9121H53.8687V26.0566H55.6461V27.1504H53.8687V30.2949H52.5699ZM66.2062 22.9121V35.1895H64.9211V28.4492H62.2141V32.1543H56.4719V23.8555H57.7844V26.9863H60.9426V23.8555H62.2141V27.3828H64.9211V22.9121H66.2062ZM57.7844 31.0879H60.9426V28.0117H57.7844V31.0879ZM78.9129 29.6387V30.6777H67.7156V29.6387H78.9129ZM69.1512 34.9023V31.4844H70.4363V33.8496H77.7508V34.9023H69.1512ZM69.1785 28.6133V23.3496H77.5457V24.3613H70.491V25.4824H77.2313V26.4668H70.491V27.6152H77.6277V28.6133H69.1785ZM85.0707 23.1172C87.8324 23.1104 89.4389 23.8555 89.4457 25.2227C89.4389 26.5967 87.8324 27.3418 85.0707 27.3418C82.309 27.3418 80.6889 26.5967 80.6957 25.2227C80.6889 23.8555 82.309 23.1104 85.0707 23.1172ZM79.4926 29.1328V28.0938H90.6625V29.1328H79.4926ZM80.8324 31.0469V30.0762H89.2543V32.9473H82.1176V34.041H89.5961V35.0391H80.8461V32.0039H87.9691V31.0469H80.8324ZM82.0492 25.2227C82.0424 25.9814 83.1225 26.3711 85.0707 26.3711C87.0326 26.3711 88.1127 25.9814 88.1059 25.2227C88.1127 24.498 87.0326 24.0742 85.0707 24.0742C83.1225 24.0742 82.0424 24.498 82.0492 25.2227ZM104.195 25.7012V26.7539H95.7867V23.0898H97.0582V25.7012H104.195ZM94.2965 28.7637V27.6973H105.507V28.7637H100.504V29.9395H104.099V32.8652H96.9898V34.0273H104.523V35.0391H95.691V31.9492H102.814V30.9375H95.6637V29.9395H99.2457V28.7637H94.2965ZM116.259 22.9121V35.1895H114.974V28.5996H112.732V27.5195H114.974V22.9121H116.259ZM106.484 25.0723V24.0195H112.007V28.3945H107.81V31.1836C109.765 31.1699 111.269 31.1084 112.978 30.8008L113.087 31.8672C111.255 32.1885 109.642 32.2637 107.482 32.2773H106.511V27.3418H110.749V25.0723H106.484ZM128.979 29.8164V30.8691H124.003V35.1484H122.731V30.8691H117.809V29.8164H128.979ZM118.438 27.8613C120.721 27.5469 122.622 26.1865 122.663 24.6758H118.848V23.6367H127.927V24.6758H124.139C124.16 26.1865 126.047 27.5469 128.364 27.8613L127.886 28.8867C125.876 28.5723 124.139 27.5811 123.394 26.1865C122.642 27.5811 120.913 28.5723 118.93 28.8867L118.438 27.8613ZM133.291 26.2617C133.291 28.2168 134.112 30.3018 135.752 31.3066L135.028 32.3047C133.879 31.6143 133.107 30.3906 132.683 28.9756C132.239 30.5273 131.391 31.8535 130.202 32.5781L129.395 31.6074C131.124 30.5684 132.04 28.4014 132.034 26.3164V24.0332H133.291V26.2617ZM134.426 28.2988V27.2188H136.327V23.1445H137.557V34.5605H136.327V28.2988H134.426ZM138.856 35.1621V22.9121H140.1V35.1621H138.856ZM152.52 32.5508V33.6309H141.309V32.5508H143.988V29.3516C142.983 28.7979 142.368 27.9229 142.375 26.8223C142.368 24.8945 144.262 23.6299 146.887 23.623C149.519 23.6299 151.412 24.8945 151.412 26.8223C151.412 27.9023 150.824 28.7705 149.84 29.3242V32.5508H152.52ZM143.633 26.8223C143.633 28.1348 144.966 28.9893 146.887 28.9961C148.794 28.9893 150.147 28.1348 150.154 26.8223C150.147 25.5029 148.794 24.6621 146.887 24.6621C144.966 24.6621 143.633 25.5029 143.633 26.8223ZM145.273 32.5508H148.527V29.8301C148.028 29.9463 147.475 30.0078 146.887 30.0078C146.312 30.0078 145.766 29.9463 145.273 29.8301V32.5508Z'
          fill='black'
        />
        <path
          d='M92.866 58.5C92.4811 59.1667 91.5189 59.1667 91.134 58.5L85.9378 49.5C85.5529 48.8333 86.034 48 86.8038 48L97.1962 48C97.966 48 98.4471 48.8333 98.0622 49.5L92.866 58.5Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_dd_2820_41976'
          x='0'
          y='0'
          width='189'
          height='73'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2820_41976'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='2' dy='4' />
          <feGaussianBlur stdDeviation='5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_2820_41976'
            result='effect2_dropShadow_2820_41976'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_2820_41976'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
