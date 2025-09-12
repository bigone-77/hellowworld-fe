'use client';

import { useState, useEffect, useMemo } from 'react';

interface TimerOptions {
  initialTime: number;
  onTimeUp?: () => void;
}

export const useTimer = ({ initialTime, onTimeUp }: TimerOptions) => {
  const [secondsLeft, setSecondsLeft] = useState(initialTime);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp?.();
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeUp]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  }, [secondsLeft]);

  const reset = () => setSecondsLeft(initialTime);

  return { formattedTime, isTimeUp: secondsLeft <= 0, reset };
};
