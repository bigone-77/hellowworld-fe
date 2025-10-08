import WidgetWrapper from '@/components/(afterLogin)/(onHomeLayout)/home/components/widgets/layout/Wrapper';
import { PrevNextBtn } from '@repo/ui/components';

export default function MyBadges() {
  return (
    <WidgetWrapper
      title='내 뱃지'
      headerRightContent={
        <PrevNextBtn onPrevClick={() => {}} onNextClick={() => {}} />
      }
    >
      <div></div>
    </WidgetWrapper>
  );
}
