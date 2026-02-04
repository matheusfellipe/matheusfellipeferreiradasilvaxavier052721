import React from 'react';

interface ImageCardProps {
  src: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, className = '' }) => (
  <div className={`overflow-hidden rounded-2xl ${className}`}>
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover"
    />
  </div>
);

export default ImageCard;
