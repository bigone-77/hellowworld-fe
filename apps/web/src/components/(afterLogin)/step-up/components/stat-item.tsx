interface Props {
  label: string;
  value: number;
  unit: string;
}

export default function StatItem({ label, value, unit }: Props) {
  return (
    <div>
      <p className='text-body-l2 text-text1'>{label}</p>
      <div className='mt-[6] flex items-baseline gap-x-2 text-black'>
        <span className='text-display-l'>{value.toLocaleString()}</span>
        <span className='text-body-l2'>{unit}</span>
      </div>
    </div>
  );
}
