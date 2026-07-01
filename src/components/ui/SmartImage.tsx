import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FALLBACK_IMAGE, srcSetFor } from '@/lib/images';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** sizes-Attribut für responsives Laden, z.B. "(min-width:1024px) 33vw, 100vw". */
  sizes?: string;
}

/**
 * Bild mit sanftem Einblenden, responsivem srcset und gebrandetem
 * Fallback, falls die externe Quelle nicht erreichbar ist.
 */
export default function SmartImage({ src, alt, className, imgClassName, eager = false, sizes = '100vw' }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-navy/5', className)}>
      <img
        src={failed ? FALLBACK_IMAGE : src}
        srcSet={failed ? undefined : srcSetFor(src)}
        sizes={failed ? undefined : sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) setFailed(true);
        }}
        className={cn(
          'w-full h-full object-cover transition-all duration-700',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
          imgClassName
        )}
      />
    </div>
  );
}
