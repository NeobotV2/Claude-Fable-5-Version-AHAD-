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
 * Direkt sichtbares Bild mit responsivem srcset und gebrandetem Fallback,
 * falls die externe Quelle nicht erreichbar ist.
 */
export default function SmartImage({ src, alt, className, imgClassName, eager = false, sizes = '100vw' }: SmartImageProps) {
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
        onError={() => {
          if (!failed) setFailed(true);
        }}
        className={cn(
          'w-full h-full object-cover',
          imgClassName
        )}
      />
    </div>
  );
}
