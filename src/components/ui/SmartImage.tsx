import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FALLBACK_IMAGE } from '@/lib/images';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/**
 * Bild mit sanftem Einblenden und gebrandetem Fallback,
 * falls die externe Quelle nicht erreichbar ist.
 */
export default function SmartImage({ src, alt, className, imgClassName, eager = false }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-navy/5', className)}>
      <img
        src={failed ? FALLBACK_IMAGE : src}
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
