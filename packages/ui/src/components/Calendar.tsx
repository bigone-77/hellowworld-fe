'use client';

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

import InlineSvg from './InlineSvg';
import Button from './Button';
import Popover from './Popover';
import PrevNextBtn from './PrevNextBtn';

interface CalendarTitleProps {
  headerTitle: string;
  ref?: React.Ref<HTMLDivElement>;
  isPopupOpen: boolean;
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

const CalendarTitle = ({
  ref,
  headerTitle,
  isPopupOpen,
  ...props
}: CalendarTitleProps) => (
  <div
    ref={ref}
    {...props}
    className={`${isPopupOpen ? 'rounded-S border-text2' : 'border-text-line rounded-FULL'} text-text1 hover:bg-text-box focus:!rounded-S disabled:bg-text-box flex cursor-pointer items-center justify-between gap-2 border px-3 py-[9] transition-colors active:bg-transparent disabled:opacity-50`}
  >
    <span className='text-body-l2'>{headerTitle}</span>
    <InlineSvg
      srcurl='${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1753371406/svg/down-arrow.svg'
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
      <InlineSvg alias='prevArrow' width={24} height={24} />
    </Button>
    <Button
      onClick={goToNextMonth}
      variant='primary_icon'
      size='s'
      className='!rounded-FULL'
    >
      <InlineSvg alias='nextArrow' width={24} height={24} />
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

  const changeYearHandler = (flag: 'prev' | 'next') => {
    return flag === 'prev'
      ? onYearChange(pickerYear - 1)
      : onYearChange(pickerYear + 1);
  };

  return (
    <div className='rounded-L shadow-modal-s w-full border border-white/60 bg-white p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <span className='text-body-l2 font-bold'>{pickerYear}년</span>
        <PrevNextBtn
          onPrevClick={() => changeYearHandler('prev')}
          onNextClick={() => changeYearHandler('next')}
          prevBtnProps={{
            className: '!rounded-FULL size-5',
          }}
          nextBtnProps={{
            className: '!rounded-FULL size-5',
          }}
          iconSize={12}
        />
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {months.map((monthIndex) => (
          <span
            key={monthIndex}
            onClick={() => onMonthSelect(monthIndex)}
            className={cn(
              `rounded-FULL text-body-l1 text-text1 hover:bg-secondary-box active:bg-secondary-box-var1 active:text-secondary-box-on active:border-secondary-line relative flex cursor-pointer items-center justify-center border border-transparent px-[10] py-[14] transition-colors`,
              {
                'bg-secondary-box-var1 text-secondary-box-on border-secondary-line':
                  pickerYear === currentMonth.getFullYear() &&
                  monthIndex === currentMonth.getMonth(),
              },
            )}
          >
            {monthIndex + 1}월
          </span>
        ))}
      </div>
    </div>
  );
};

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

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-between'>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <Popover.Trigger>
            <CalendarTitle
              headerTitle={headerTitle}
              isPopupOpen={isPopoverOpen}
            />
          </Popover.Trigger>
          <Popover.Content align='start'>
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
          </Popover.Content>
        </Popover>
        <PrevNextBtn onPrevClick={goToPrevMonth} onNextClick={goToNextMonth} />
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
                'rounded-FULL relative flex cursor-pointer items-center justify-center border border-transparent px-[10] py-[14] transition-colors',
                {
                  'bg-secondary-box-var1 text-secondary-box-on border-secondary-line':
                    isSelected,
                  'bg-primary-box': isHighlighted,
                  'flex-col py-[6]': isToday(day),
                  'active:bg-secondary-box-var1 active:text-secondary-box-on active:border-secondary-line hover:bg-gray-100':
                    !isSelected,
                  'opacity-50': !isCurrentMonthDay,
                },
              )}
            >
              <span
                className={cn('text-body-l1', {
                  'text-text1': isSameMonth(day, currentMonth),
                  'text-text-line': !isSameMonth(day, currentMonth),
                  'text-text2': isToday(day),
                })}
              >
                {format(day, 'd')}
              </span>
              {isToday(day) && (
                <InlineSvg
                  srcurl='${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1753371466/svg/check.svg'
                  width={16}
                  height={16}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
