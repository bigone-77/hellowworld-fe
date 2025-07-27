import { useState, useEffect, HTMLAttributes } from 'react';

interface InlineSvgProps extends HTMLAttributes<HTMLSpanElement> {
  srcUrl: string;
  width?: number;
  height?: number;
}

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
        .then((text) => {
          // SVG 문자열에서 width와 height 속성을 제거합니다.
          const cleanedSvg = text
            .replace(/width="[^"]*"/, '')
            .replace(/height="[^"]*"/, '');
          setSvg(cleanedSvg);
        })
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
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default InlineSvg;
