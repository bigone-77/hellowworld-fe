import WidgetWrapper from '@/components/(afterLogin)/(onHomeLayout)/home/components/widgets/layout/Wrapper';
import { Calendar as CalendarUI } from '@repo/ui/components';

export default function Calendar() {
  return (
    <WidgetWrapper title='캘린더'>
      <div className='h-3' />
      <CalendarUI />
    </WidgetWrapper>
  );
}
