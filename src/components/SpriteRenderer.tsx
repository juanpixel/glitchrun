import React from 'react';

interface SpriteRendererProps {
  sprite: string[][];
  size?: number | string;
  className?: string;
  pixelClassName?: string;
  tint?: string;
}

export const SpriteRenderer: React.FC<SpriteRendererProps> = ({ 
  sprite, 
  size = '100%', 
  className = '', 
  pixelClassName = '',
  tint = '#39FF14' 
}) => {
  return (
    <div 
      className={`grid grid-cols-8 ${className}`}
      style={{ 
        width: size, 
        aspectRatio: '1/1',
      }}
    >
      {sprite.flat().map((pixel, i) => (
        <div 
          key={i} 
          className={`w-full h-full ${pixelClassName}`}
          style={{ 
            backgroundColor: pixel === 'PLACEHOLDER' ? tint : (pixel || 'transparent') 
          }} 
        />
      ))}
    </div>
  );
};
