import Image from 'next/image';

export type HomeProofFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  priority?: boolean;
  sizes: string;
  focalPosition?: string;
};

/**
 * Homepage proof frame — native aspect ratio, light browser chrome.
 * Separate from portfolio card frames (16:9 / 3:4) used on /projects/.
 */
export function HomeProofFrame({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  sizes,
  focalPosition = 'center top',
}: HomeProofFrameProps) {
  return (
    <figure className="home-proof-frame">
      <div className="home-proof-frame__shell overflow-hidden rounded-card border border-line bg-canvas">
        <div className="home-proof-frame__chrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div
          className="home-proof-frame__viewport relative overflow-hidden bg-surface"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            className="block h-full w-full object-cover"
            style={{ objectPosition: focalPosition }}
          />
        </div>
      </div>
      <figcaption className="mt-2 text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
