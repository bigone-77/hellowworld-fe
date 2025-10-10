import DefaultTextField, { Props as DefaultTextFieldProps } from './default';
import TestTextField, { Props as TestTextFieldProps } from './test';

type DefaultProps = { variant?: 'default' } & DefaultTextFieldProps;
type TestProps = { variant: 'test' } & TestTextFieldProps;

type TextFieldProps = DefaultProps | TestProps;

const TextField = (props: TextFieldProps) => {
  switch (props.variant) {
    case 'test':
      return <TestTextField {...props} />;
    case 'default':
    default:
      return <DefaultTextField {...props} />;
  }
};

export default TextField;
