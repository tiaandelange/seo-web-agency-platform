import Image from 'next/image';

/** Shared 16:9 frame for portfolio cards and case-study heroes (desktop). */
export const PROJECT_SHOT_ASPECT = {
  width: 1440,
  height: 810,
} as const;

/** Portrait phone proof shots shown below the sm breakpoint. */
export const PROJECT_SHOT_MOBILE_ASPECT = {
  width: 780,
  height: 1040,
} as const;

export type ProjectScreenshotProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  /** CSS object-position, e.g. "center top" */
  focalPosition?: string;
  priority?: boolean;
  variant?: 'card' | 'detail';
  caption?: string;
  className?: string;
};

/**
 * Optimised screenshot preview — not a live reconstruction of the source site.
 * Consistent 16:9 frame, responsive desktop/mobile assets, explicit dimensions.
 */
export function ProjectScreenshot({
  desktopSrc,
  mobileSrc,
  alt,
  focalPosition = 'center top',
  priority = false,
  variant = 'card',
  caption,
  className = '',
}: ProjectScreenshotProps) {
  const isDetail = variant === 'detail';
  const sizes = isDetail
    ? '(max-width: 768px) 100vw, min(1100px, 92vw)'
    : '(max-width: 639px) 100vw, (max-width: 1024px) 100vw, 720px';

  return (
    <figure className={`project-screenshot project-screenshot--${variant} ${className}`.trim()}>
      <div className="project-screenshot__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="project-screenshot__frame">
        {mobileSrc ? (
          <>
            <Image
              src={desktopSrc}
              alt={alt}
              width={PROJECT_SHOT_ASPECT.width}
              height={PROJECT_SHOT_ASPECT.height}
              priority={priority}
              loading={priority ? undefined : 'lazy'}
              sizes={sizes}
              className="project-screenshot__image project-screenshot__image--desktop"
              style={{ objectPosition: focalPosition }}
            />
            <Image
              src={mobileSrc}
              alt={alt}
              width={PROJECT_SHOT_MOBILE_ASPECT.width}
              height={PROJECT_SHOT_MOBILE_ASPECT.height}
              priority={priority}
              loading={priority ? undefined : 'lazy'}
              sizes="100vw"
              className="project-screenshot__image project-screenshot__image--mobile"
              style={{ objectPosition: focalPosition }}
            />
          </>
        ) : (
          <Image
            src={desktopSrc}
            alt={alt}
            width={PROJECT_SHOT_ASPECT.width}
            height={PROJECT_SHOT_ASPECT.height}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            sizes={sizes}
            className="project-screenshot__image"
            style={{ objectPosition: focalPosition }}
          />
        )}
      </div>
      {caption ? <figcaption className="project-screenshot__caption">{caption}</figcaption> : null}
    </figure>
  );
}
