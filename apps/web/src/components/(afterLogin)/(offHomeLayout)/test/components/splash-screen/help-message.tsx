import { motion, easeOut, Variants } from 'framer-motion';

import { InlineSvg } from '@repo/ui/components';
import { IconAlias } from '@repo/ui/config/icon';

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

interface Props {
  icon: IconAlias;
  text: string;
  bold: string;
}

export default function SplashHelpMessage({ icon, text, bold }: Props) {
  const renderTextWithBold = () => {
    if (!bold || !text.includes(bold)) {
      return <span>{text}</span>;
    }

    const parts = text.split(bold);

    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className='text-secondary-on text-body-l2'>{bold}</span>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <motion.div
      className='rounded-S flex items-center gap-x-[10] bg-white px-4 py-[9] shadow-md'
      variants={messageVariants}
      initial='hidden'
      animate='visible'
    >
      <InlineSvg alias={icon} />
      <span className='text-body-l'>{renderTextWithBold()}</span>
    </motion.div>
  );
}
