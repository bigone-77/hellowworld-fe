import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  isSameDay,
  setMonth,
  setYear,
} from 'date-fns';

import { cn } from '../lib/utils';

import InlineSvg from '../components/InlineSvg';
import Button from '../components/Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

interface CalendarTitleProps {
  headerTitle: string;
  ref?: React.Ref<HTMLDivElement>;
  [key: string]: any;
}

interface CalendarNavigatorProps {
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
}

interface ModalProps {
  pickerYear: number;
  currentMonth: Date;
  onYearChange: (year: number) => void;
  onMonthSelect: (monthIndex: number) => void;
}

const CalendarTitle = ({ ref, headerTitle, ...props }: CalendarTitleProps) => (
  <div
    ref={ref}
    {...props}
    className={`border-text-line rounded-FULL text-text1 hover:bg-text-box focus:!rounded-S disabled:bg-text-box flex cursor-pointer items-center justify-between gap-2 border px-3 py-[9] transition-colors active:bg-transparent disabled:opacity-50`}
  >
    <span className='text-body-l2'>{headerTitle}</span>
    <InlineSvg
      srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371406/svg/down-arrow.svg'
      width={13.5}
      height={6.75}
    />
  </div>
);

const CalendarNavigator = ({
  goToPrevMonth,
  goToNextMonth,
}: CalendarNavigatorProps) => (
  <div className='flex items-center justify-center gap-2'>
    <Button
      onClick={goToPrevMonth}
      variant='primary_icon'
      size='s'
      className='!rounded-FULL'
    >
      <InlineSvg
        srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/prev-arrow.svg'
        width={24}
        height={24}
      />
    </Button>
    <Button
      onClick={goToNextMonth}
      variant='primary_icon'
      size='s'
      className='!rounded-FULL'
    >
      <InlineSvg
        srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/next-arrow.svg'
        width={24}
        height={24}
      />
    </Button>
  </div>
);

const CalendarWeekdays = () => {
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className='text-body-l1 text-text1 grid grid-cols-7 gap-1 text-center'>
      {WEEKDAYS.map((day) => (
        <div key={day} className='px-[10] py-4'>
          {day}
        </div>
      ))}
    </div>
  );
};

const CalendarModal = ({
  pickerYear,
  currentMonth,
  onYearChange,
  onMonthSelect,
}: ModalProps) => {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className='w-full rounded-lg border bg-white p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <Button
          onClick={() => onYearChange(pickerYear - 1)}
          variant='primary_icon'
          size='s'
          className='!rounded-FULL'
        >
          <InlineSvg
            srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/prev-arrow.svg'
            width={24}
            height={24}
          />
        </Button>
        <span className='text-body-l2 font-bold'>{pickerYear}년</span>
        <Button
          onClick={() => onYearChange(pickerYear + 1)}
          variant='primary_icon'
          size='s'
          className='!rounded-FULL'
        >
          <InlineSvg
            srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/next-arrow.svg'
            width={24}
            height={24}
          />
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {months.map((monthIndex) => (
          <Button
            key={monthIndex}
            onClick={() => onMonthSelect(monthIndex)}
            variant={
              pickerYear === currentMonth.getFullYear() &&
              monthIndex === currentMonth.getMonth()
                ? 'secondary'
                : 'outline_s'
            }
          >
            {monthIndex + 1}월
          </Button>
        ))}
      </div>
    </div>
  );
};

// --- 최종 메인 캘린더 컴포넌트 ---
const Calendar = ({ highlightedDates = [] }: { highlightedDates?: Date[] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentMonth.getFullYear());

  const goToPrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    if (!isSameMonth(day, currentMonth)) {
      setCurrentMonth(startOfMonth(day));
    }
    setSelectedDate(day);
  };

  const headerTitle = format(currentMonth, 'yyyy년 M월');
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  console.log(isPopoverOpen);

  return (
    <div className='w-[350px] rounded-lg bg-white p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <CalendarTitle headerTitle={headerTitle} />
          </PopoverTrigger>
          <PopoverContent>
            <CalendarModal
              pickerYear={pickerYear}
              currentMonth={currentMonth}
              onYearChange={setPickerYear}
              onMonthSelect={(monthIndex) => {
                let newDate = setYear(currentMonth, pickerYear);
                newDate = setMonth(newDate, monthIndex);
                setCurrentMonth(newDate);
                setIsPopoverOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        <CalendarNavigator
          goToPrevMonth={goToPrevMonth}
          goToNextMonth={goToNextMonth}
        />
      </div>

      <CalendarWeekdays />

      <div className='mt-2 grid grid-cols-7 gap-1'>
        {days.map((day) => {
          const isCurrentMonthDay = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isHighlighted =
            !isSelected && highlightedDates.some((d) => isSameDay(d, day));

          return (
            <div
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={cn(
                'rounded-FULL relative flex cursor-pointer items-center justify-center px-[10] py-[14] transition-colors',
                {
                  'bg-secondary-box-var1': isSelected,
                  'bg-yellow-200': isHighlighted,
                  'bg-blue-200': isToday(day) && !isSelected && !isHighlighted,
                  'hover:bg-gray-100': !isSelected,
                  'opacity-50': !isCurrentMonthDay,
                },
              )}
            >
              <span
                className={cn('font-medium', {
                  'text-text1': isSameMonth(day, currentMonth),
                  'text-text-line': !isSameMonth(day, currentMonth),
                })}
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
