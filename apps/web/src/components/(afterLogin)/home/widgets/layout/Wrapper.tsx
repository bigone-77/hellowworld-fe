import { Button } from '@repo/ui/components';
import Link from 'next/link';

interface BaseProps {
  title: string;
  children: React.ReactNode;
}

interface MoreButtonVisibleProps {
  isMoreBtnVisible: true;
  href: string;
}

interface MoreButtonHiddenProps {
  isMoreBtnVisible?: false;
  href?: never;
}

type Props = BaseProps & (MoreButtonVisibleProps | MoreButtonHiddenProps);

export default function WidgetWrapper(props: Props) {
  const { title, children } = props;

  return (
    <section className='rounded-L bg-white px-6 pt-6'>
      {props.isMoreBtnVisible ? (
        <div className='flex items-center justify-between'>
          <span className='text-headline-s text-black'>{title}</span>
          <Link href={props.href}>
            <Button className='text-text2' variant='text'>
              더보기
            </Button>
          </Link>
        </div>
      ) : (
        <span className='text-headline-s text-black'>{title}</span>
      )}
      {children}
    </section>
  );
}
