import InlineSvg from './InlineSvg';
import Label from './Label';

import { cn } from '../lib/utils';

interface BaseProps {
  label: string;
  value: number;
  unit: string;
}

interface NoChangeProps {
  change?: never;
  changeType?: never;
}

interface HasChangeProps {
  change: number;
  changeType: 'increase' | 'decrease';
}

type Props = BaseProps & (NoChangeProps | HasChangeProps);

const StatItem = ({ label, value, unit, change, changeType }: Props) => {
  const labelVariant = changeType === 'increase' ? 'negative' : 'positive';

  const iconRotation =
    changeType === 'decrease' ? 'rotate-90' : 'rotate-[-90deg]';
  return (
    <div>
      <p className='text-body-l2 text-text1'>{label}</p>
      <div className='mt-[6] flex items-baseline gap-x-2 text-black'>
        <span className='text-display-l'>{value.toLocaleString()}</span>
        <span className='text-body-l2'>{unit}</span>

        {change !== undefined && (
          <Label variant={labelVariant}>
            <div className='flex-center gap-x-1'>
              <span className='text-[0.688rem]'>{change}</span>
              <InlineSvg
                alias='play'
                width={16}
                height={16}
                className={cn(
                  'transition-transform duration-200',
                  iconRotation,
                )}
              />
            </div>
          </Label>
        )}
      </div>
    </div>
  );
};

export default StatItem;
