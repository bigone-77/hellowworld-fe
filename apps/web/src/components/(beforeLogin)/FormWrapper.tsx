interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FormWrapper({ title, children }: Props) {
  return (
    <div className='rounded-L shadow-modal-l min-h-[850px] w-[405px] bg-white px-6 pb-10 pt-[82]'>
      <h2 className='text-center'>
        <span className='text-display-s text-text2'>{title}</span>
      </h2>
      {children}
    </div>
  );
}
