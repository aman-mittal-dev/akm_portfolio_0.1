import { useState } from 'react';

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium';
}

export default function ProfilePhoto({
  src = '/profile-photo.jpg',
  alt = 'Professional headshot',
  size = 'medium',
}: ProfilePhotoProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const dimension = size === 'small' ? 56 : 76;

  return (
    <div
      className="profile-photo"
      style={{ width: dimension, height: dimension }}
      aria-label={imageUnavailable ? 'Profile photo placeholder' : undefined}
    >
      {!imageUnavailable && (
        <img
          src={src}
          alt={alt}
          onError={() => setImageUnavailable(true)}
        />
      )}
      {imageUnavailable && (
        <div className="profile-photo-fallback" aria-hidden="true">
          <PersonIcon />
        </div>
      )}
      <span className="profile-photo-status" aria-hidden="true" />
    </div>
  );
}

function PersonIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0115 0" />
    </svg>
  );
}
