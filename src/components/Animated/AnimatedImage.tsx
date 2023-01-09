import {motion} from 'framer-motion';
import React from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  onImageAnimeComplete?: () => void;
}

export function AnimatedImage({src, alt, onImageAnimeComplete, ...props}: AnimatedImageProps) {
  return (
      <motion.img
          {...props}
          src={src}
          alt={alt}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 1}}
          onAnimationComplete={onImageAnimeComplete}
      />
  );
}
