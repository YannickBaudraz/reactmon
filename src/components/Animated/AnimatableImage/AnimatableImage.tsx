import React, {forwardRef} from 'react';
import {motion} from 'framer-motion';
import './AnimatableImage.scss';
import {Image} from 'primereact/image';

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcZoom: string;
}

export const AnimatableImage = forwardRef<HTMLImageElement, AnimatedImageProps>((props, ref) => {
  return (
      <motion.div
          ref={ref}
          whileHover={{scale: 1.05}}
      >
        <Image
            className="bg-transparent"
            imageClassName="shadow-5 max-h-full max-w-full"
            src={props.src}
            zoomSrc={props.srcZoom}
            alt={props.alt}
            preview
        />
      </motion.div>
  );
});
