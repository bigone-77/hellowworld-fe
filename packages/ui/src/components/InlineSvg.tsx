import { useState, useEffect, HTMLAttributes } from 'react';

interface InlineSvgProps extends HTMLAttributes<HTMLSpanElement> {
  srcUrl: string;
  width?: number;
  height?: number;
}

// props 객체에 직접 타입을 지정합니다.
const InlineSvg = ({
  srcUrl,
  width = 24,
  height = 24,
  className,
  ...props
}: InlineSvgProps) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (srcUrl) {
      fetch(srcUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`SVG fetch failed: ${res.statusText}`);
          }
          return res.text();
        })
        .then(setSvg)
        .catch(console.error);
    }
  }, [srcUrl]);

  if (!svg) {
    return (
      <span
        className={`inline-block ${className || ''}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <span
      {...props}
      className={`inline-flex items-center justify-center ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default InlineSvg;
