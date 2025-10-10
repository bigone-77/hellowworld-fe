import EduProgressBar, { Props as EduProgressBarProps } from './edu';
import TestProgressbar, { Props as TestProgressBarProps } from './test';
import AwardProgressbar, { Props as AwardProgressBarProps } from './award';

type EduProps = { variant?: 'edu' } & EduProgressBarProps;
type TestProps = { variant: 'test' } & TestProgressBarProps;
type AwardProps = { variant: 'award' } & AwardProgressBarProps;

type ProgressBarProps = EduProps | TestProps | AwardProps;

const ProgressBar = (props: ProgressBarProps) => {
  switch (props.variant) {
    case 'test':
      return <TestProgressbar {...props} />;
    case 'award':
      return <AwardProgressbar {...props} />;
    case 'edu':
    default:
      return <EduProgressBar {...props} />;
  }
};

export default ProgressBar;
