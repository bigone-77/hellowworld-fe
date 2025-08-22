import { useState, useEffect, HTMLAttributes } from 'react';
import { ICON_MAP, IconAlias } from '../config/icon';

interface BaseProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number;
  height?: number;
}

interface AliasProps {
  alias: IconAlias;
  srcurl?: never;
}

interface ImgUrlProps {
  alias?: never;
  srcurl: string;
}

type InlineSvgProps = BaseProps & (AliasProps | ImgUrlProps);

const InlineSvg = ({
  width = 24,
  height = 24,
  className,
  ...props
}: InlineSvgProps) => {
  const [svg, setSvg] = useState<string | null>(null);

  const srcurl =
    'alias' in props && props.alias ? ICON_MAP[props.alias] : props.srcurl;

  useEffect(() => {
    if (srcurl) {
      fetch(srcurl)
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
  }, [srcurl]);

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

export { InlineSvg };
