import Button, { ButtonProps } from './Button';
import InlineSvg from './InlineSvg';

interface ToggleButtonProps extends Omit<ButtonProps, 'children'> {
  imgUrl: string;
  isOn: boolean;
}

const ToggleButton = ({
  imgUrl,
  isOn = false,
  ...props
}: ToggleButtonProps) => {
  return (
    <Button {...props}>
      <InlineSvg className={`${!isOn && 'opacity-30'}`} srcUrl={imgUrl} />
    </Button>
  );
};

export default ToggleButton;
