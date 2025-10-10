import Link from 'next/link';

import { Button } from '@repo/ui/components';

interface BaseProps {
  title: string;
  children: React.ReactNode;
  headerRightContent?: React.ReactNode;
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
  const { title, children, headerRightContent } = props;

  const renderHeaderRight = () => {
    if (headerRightContent) {
      return headerRightContent;
    }

    if (props.isMoreBtnVisible) {
      return (
        <Link href={props.href}>
          <Button className='text-text2' variant='text'>
            더보기
          </Button>
        </Link>
      );
    }

    return null;
  };

  return (
    <section className='rounded-L bg-white px-6 pt-6'>
      <div className='flex items-center justify-between'>
        <span className='text-headline-s text-black'>{title}</span>
        {renderHeaderRight()}
      </div>
      {children}
    </section>
  );
}
