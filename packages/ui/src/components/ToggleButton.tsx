import { ALL_ICONS_MAP, ICON_MAP, IconAlias } from '../config/icon';
import Button, { ButtonProps } from './Button';
import InlineSvg, { AliasProps, ImgUrlProps } from './InlineSvg';

interface ToggleButtonBaseProps extends Omit<ButtonProps, 'children'> {
  isOn?: boolean;
}

export type ToggleButtonProps = ToggleButtonBaseProps &
  (AliasProps | ImgUrlProps);

const ToggleButton = ({ isOn = false, ...props }: ToggleButtonProps) => {
  const srcurl =
    'alias' in props && props.alias ? ALL_ICONS_MAP[props.alias] : props.srcurl;

  return (
    <Button {...props}>
      <InlineSvg className={`${!isOn && 'opacity-30'}`} srcurl={srcurl} />
    </Button>
  );
};

export default ToggleButton;
