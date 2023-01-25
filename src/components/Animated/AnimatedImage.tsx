import {HTMLMotionProps, motion, useAnimationControls} from 'framer-motion';
import React, {useEffect} from 'react';

interface AnimatedImageProps extends HTMLMotionProps<'img'>{
  src: string;
  alt: string;
  onAnimeComplete?: () => void;
}

export default function AnimatedImage({src, alt, onAnimeComplete, ...props}: AnimatedImageProps) {
  const animationControls = useAnimationControls();

  useEffect(() => {
    animationControls.start({
      opacity: 1,
      transition: {duration: 1}
    }).then();
  }, [src]);

  return (
      <motion.img
          {...props}
          src={src}
          alt={alt}
          initial={{opacity: 0}}
          animate={animationControls}
          onAnimationComplete={onAnimeComplete}
      />
  );
}
