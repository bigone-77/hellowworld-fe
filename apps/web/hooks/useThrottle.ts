import { useCallback, useRef } from 'react';

// 제네릭 타입을 사용해 모든 종류의 함수에 대응할 수 있도록 합니다.
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  // 마지막으로 호출된 시간을 저장하기 위한 ref
  const lastCallTime = useRef<number>(0);

  // 콜백 함수가 바뀌어도 최신 함수를 참조하도록 ref 사용
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  // useCallback으로 메모이제이션된 throttle 함수를 반환
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      // 현재 시간과 마지막 호출 시간의 차이가 delay보다 크면 실행
      if (now - lastCallTime.current >= delay) {
        lastCallTime.current = now;
        callbackRef.current(...args);
      }
    },
    [delay], // delay 값이 변경될 때만 함수를 재생성
  );
}
