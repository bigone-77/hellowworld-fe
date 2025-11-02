import WidgetWrapper from '@/components/(afterLogin)/(onHomeLayout)/home/components/widgets/layout/Wrapper';

import ProblemStatusOnboarding from './onboarding';
import ProblemStatusStatus from './status';

export default function ProblemStatus() {
  const tempStatus = false; // 임의의 변수 설정 -> 한 번도 스텝별 문제풀이 접근한 적이 없을때
  return (
    <WidgetWrapper title='나의 문제 현황' isMoreBtnVisible href='/step-up'>
      {tempStatus ? <ProblemStatusStatus /> : <ProblemStatusOnboarding />}
    </WidgetWrapper>
  );
}
