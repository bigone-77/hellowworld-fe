'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

const STROKE_WIDTH = 40;
const SIZE = 220;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

const MASCOT_WIDTH = 140;
const MASCOT_HEIGHT = 141;

const MASCOT_X = SIZE / 2 - MASCOT_WIDTH / 2;
const MASCOT_Y = 120;

type SplashLoadingCircleProps = {
  progress: MotionValue<number>;
};

export default function SplashLoadingCircle({
  progress,
}: SplashLoadingCircleProps) {
  const strokeDashoffset = useTransform(
    progress,
    (latest) => CIRCUMFERENCE - (latest / 100) * CIRCUMFERENCE,
  );

  const progressText = useTransform(
    progress,
    (latest) => `${Math.round(latest)}%`,
  );

  return (
    <motion.svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='relative'
    >
      <svg
        width={MASCOT_WIDTH}
        height={MASCOT_HEIGHT}
        viewBox='0 0 170 171'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        x={MASCOT_X}
        y={MASCOT_Y - 40}
      >
        <path
          d='M33 78.5C33 50.6096 55.6096 28 83.5 28C111.39 28 134 50.6096 134 78.5V143.741C134 148.854 129.854 153 124.741 153H42.2593C37.1455 153 33 148.854 33 143.741V78.5Z'
          fill='#FFDE3A'
        />
        <path
          d='M45.6255 66.8035C45.6262 63.5099 48.2967 60.8404 51.5904 60.8411C54.884 60.8418 57.5535 63.5123 57.5529 66.806L57.552 70.7821C57.5514 74.0757 54.8808 76.7452 51.5871 76.7445C48.2935 76.7439 45.6240 74.0733 45.6247 70.7796L45.6255 66.8035Z'
          fill='black'
        />
        <path
          d='M81.4080 66.8035C81.4086 63.5099 84.0792 60.8404 87.3729 60.8411C90.6665 60.8418 93.3360 63.5123 93.3353 66.806L93.3345 70.7821C93.3338 74.0757 90.6632 76.7452 87.3696 76.7445C84.0759 76.7439 81.4065 74.0733 81.4071 70.7796L81.4080 66.8035Z'
          fill='black'
        />
        <rect
          x='61.5261'
          y='76.7422'
          width='15.9032'
          height='3.97587'
          rx='1.98793'
          fill='#FFB04F'
        />
        <rect
          x='61.5264'
          y='80.7188'
          width='15.9032'
          height='3.97587'
          rx='1.98793'
          fill='#FFB04F'
        />
        <ellipse
          cx='4.03024'
          cy='4.06673'
          rx='4.03024'
          ry='4.06673'
          transform='matrix(0.798417 0.602105 -0.579165 0.815211 112.621 52.2617)'
          fill='#FFF0A6'
        />
        <path
          d='M115.012 69.4883C115.836 71.8067 116.305 78.1011 113.950 81.4163'
          stroke='#FFF0A5'
          strokeWidth='8.19254'
          strokeLinecap='round'
        />
        <path
          d='M101.673 22.0634C101.673 22.0634 97.6975 30.7889 90.3109 32.9104C82.9243 35.0319 74.9242 29.7460 74.9242 29.7460C74.9242 29.7460 78.9001 21.0204 86.2867 18.8989C93.6733 16.7775 101.673 22.0634 101.673 22.0634Z'
          fill='#92D54B'
        />
        <path
          d='M77.4714 29.0137L98.4886 22.9774'
          stroke='#75B92D'
          strokeWidth='0.662632'
          strokeLinecap='round'
        />
        <path
          d='M106.8 118.406C102.442 111.601 104.425 102.551 111.230 98.1921C118.035 93.8336 127.085 95.8169 131.444 102.622L133.610 106.004C134.721 107.739 134.215 110.046 132.481 111.157L114.119 122.917C112.385 124.028 110.078 123.523 108.967 121.788L106.8 118.406Z'
          fill='#FFB04F'
        />
        <path
          d='M27.0483 99.3536C30.7822 93.4855 38.5661 91.7554 44.4342 95.4893C50.3022 99.2231 52.0324 107.007 48.2985 112.875L46.4426 115.792C45.4908 117.288 43.5067 117.729 42.0109 116.777L26.1775 106.702C24.6817 105.750 24.2407 103.766 25.1924 102.270L27.0483 99.3536Z'
          fill='#FFB04F'
        />
      </svg>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke='#FFFBEF'
        strokeWidth={STROKE_WIDTH}
        fill='none'
      />

      <motion.circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke='#FFD449'
        strokeWidth={STROKE_WIDTH}
        fill='none'
        strokeLinecap='round'
        strokeDasharray={CIRCUMFERENCE}
        style={{
          strokeDashoffset,
          transformOrigin: 'center',
          rotate: -90,
        }}
      />

      <motion.text
        x={SIZE / 2}
        y={SIZE / 2 - 40}
        textAnchor='middle'
        dominantBaseline='central'
        className='fill-current text-4xl font-bold'
        style={{ fontSize: 24 }}
      >
        {progressText}
      </motion.text>
    </motion.svg>
  );
}
