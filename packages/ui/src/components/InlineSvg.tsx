import { useState, useEffect, HTMLAttributes } from 'react';
import { ICON_MAP, IconAlias } from '../config/icon';

interface BaseProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number;
  height?: number;
}

interface AliasProps {
  alias: IconAlias;
  srcUrl?: never;
}

interface ImgUrlProps {
  alias?: never;
  srcUrl: string;
}

type InlineSvgProps = BaseProps & (AliasProps | ImgUrlProps);

const InlineSvg = ({
  width = 24,
  height = 24,
  className,
  ...props
}: InlineSvgProps) => {
  const [svg, setSvg] = useState<string | null>(null);

  const srcUrl =
    'alias' in props && props.alias ? ICON_MAP[props.alias] : props.srcUrl;

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
