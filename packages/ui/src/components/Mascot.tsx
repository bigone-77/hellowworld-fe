'use client';

import Lottie from 'lottie-react';

// 추후 실질적인 mascot json파일 들어올 예정
import tempLottie from '../assets/mascot/test.json';
// import waveLottie from '@/public/lottie/mascot-wave.json';
// import typingLottie from '@/public/lottie/mascot-typing.json';
// import studyLottie from '@/public/lottie/mascot-study.json';
// import magicLottie from '@/public/lottie/mascot-magic.json';
// import runLottie from '@/public/lottie/mascot-run.json';
// import winLottie from '@/public/lottie/mascot-win.json';
// import sighLottie from '@/public/lottie/mascot-sigh.json';
// import sleepLottie from '@/public/lottie/mascot-sleep.json';
// import panicLottie from '@/public/lottie/mascot-panic.json';

// =================================================================
// 1. 타입 정의 (Types)
// =================================================================

// 9가지 마스코트 종류를 타입으로 정의
export type MascotPose =
  | 'wave'
  | 'typing'
  | 'study'
  | 'magic'
  | 'run'
  | 'win'
  | 'sigh'
  | 'sleep'
  | 'panic';

export type AlertVariant = 'default' | 'success' | 'fail' | 'hint';

interface BaseMascotProps {
  size?: number;
  className?: string;
  message: string;
}

interface DefaultMascotProps {
  variant?: 'default';
  pose: MascotPose;
}

interface SpecificMascotProps {
  variant: 'success' | 'fail' | 'hint';
  pose?: never;
}

export type MascotProps = BaseMascotProps &
  (DefaultMascotProps | SpecificMascotProps);

const MASCOT_LOTTIE_MAP: Record<MascotPose, object> = {
  wave: tempLottie,
  typing: tempLottie,
  study: tempLottie,
  magic: tempLottie,
  run: tempLottie,
  win: tempLottie,
  sigh: tempLottie,
  sleep: tempLottie,
  panic: tempLottie,
};

const VARIANT_MASCOT_MAP: Record<'success' | 'fail' | 'hint', MascotPose> = {
  success: 'win',
  fail: 'panic',
  hint: 'study',
};

const ALERT_TITLE_MAP: Partial<Record<AlertVariant, string>> = {
  success: '잘했어요!',
  fail: '오답이에요!',
  hint: '힌트',
};

const ALERT_STYLE_MAP: Record<AlertVariant, string> = {
  default: 'border-primary-box p-3 rounded-l-S rounded-tr-S',
  success: 'bg-blue-100 p-6 rounded-l-M rounded-tr-M',
  fail: 'bg-red-100 p-6 rounded-l-M rounded-tr-M',
  hint: 'bg-yellow-100 p-6 rounded-l-M rounded-tr-M',
};

// =================================================================
// 3. 컴포넌트 구현 (Component)
// =================================================================

const Mascot = (props: MascotProps) => {
  const { size = 160, className, message } = props;

  const variant: AlertVariant = props.variant ?? 'default';

  let mascotToShow: MascotPose;
  if (variant !== 'default') {
    const mappedPose =
      VARIANT_MASCOT_MAP[variant as keyof typeof VARIANT_MASCOT_MAP];
    if (!mappedPose) {
      mascotToShow = 'wave';
    } else {
      mascotToShow = mappedPose;
    }
  } else {
    if (!('pose' in props) || !props.pose) {
      mascotToShow = 'wave';
    } else {
      mascotToShow = props.pose;
    }
  }

  const title = ALERT_TITLE_MAP[variant];
  const alertStyle = ALERT_STYLE_MAP[variant] ?? ALERT_STYLE_MAP['default'];
  const lottieData = MASCOT_LOTTIE_MAP[mascotToShow];

  return (
    <div className={`flex justify-center ${className}`}>
      <div className='relative w-fit'>
        <div
          className={`absolute right-[calc(100%+1rem)] top-5 w-max border text-center ${alertStyle}`}
        >
          {title && <p className='mb-1 text-lg font-bold'>{title}</p>}
          <p className='text-body-l2 whitespace-pre-wrap text-black'>
            {message}
          </p>
        </div>

        <Lottie
          animationData={lottieData}
          style={{ width: size, height: size }}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Mascot;
