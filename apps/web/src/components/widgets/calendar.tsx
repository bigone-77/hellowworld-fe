import CalendarUI from '@repo/ui/components/Calendar';

export default function Calendar() {
  return (
    <section className='rounded-L bg-white px-6 pt-6'>
      <span className='text-headline-s text-black'>캘린더</span>
      <div className='h-3' />
      <CalendarUI />
    </section>
  );
}
