import React, {forwardRef} from 'react';
import {motion} from 'framer-motion';
import {Image} from 'primereact/image';
import './PokemonCard.scss';

interface PokemonCardProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcZoom: string;
}

export const PokemonCard = forwardRef<HTMLImageElement, PokemonCardProps>((props, ref) => {
  return (
      <motion.div
          ref={ref}
          whileHover={{scale: 1.05}}
          whileTap={{scale: .95}}
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
