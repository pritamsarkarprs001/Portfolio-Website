import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { cn } from '../lib/utils';

type ProfileImageProps = {
  className?: string;
  eager?: boolean;
  sizes?: string;
  decorative?: boolean;
  size?: string;
  variant?: 'primary' | 'secondary';
};

export function ProfileImage({
  className,
  eager = false,
  sizes = '320px',
  decorative = false,
  size,
  variant = 'primary',
}: ProfileImageProps) {
  const photo = variant === 'secondary' ? profile.secondaryPhoto : profile.photo;
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [variant]);
  const showImage = photo.available && !failed;
  const sizeStyle = {
    ...(size ? { width: size, height: size } : {}),
    objectPosition: photo.objectPosition,
  };
  return showImage ? (
    <img
      className={cn('profile-image', className)}
      style={sizeStyle}
      src={photo.src}
      srcSet={`${photo.src} ${photo.width}w`}
      alt={decorative ? '' : photo.alt}
      width={photo.width}
      height={photo.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  ) : (
    <div
      className={cn('profile-image profile-image-fallback', className)}
      style={sizeStyle}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Initials avatar for Pritam Sarkar'}
    >
      <span>PS</span>
      <small>profile image placeholder</small>
    </div>
  );
}
