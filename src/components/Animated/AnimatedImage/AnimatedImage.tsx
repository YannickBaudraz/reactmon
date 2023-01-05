import React, {useRef, useState} from 'react';
import {motion, TargetAndTransition, Transition, useDomEvent} from 'framer-motion';
import './AnimatedImage.scss';

interface OpenClosedAnimation {
  open: TargetAndTransition;
  closed: TargetAndTransition;
}

const divAnimation: OpenClosedAnimation = {
  open: {opacity: 1, zIndex: 1},
  closed: {opacity: 0, transitionEnd: {zIndex: 0}}
};

const imgAnimation: OpenClosedAnimation = {
  open: {opacity: 10, zIndex: 1},
  closed: {opacity: 1, transitionEnd: {zIndex: 0}}
};

const transition: Transition = {
  type: 'spring',
  damping: 25,
  stiffness: 120
};

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcZoom: string;
}

export function AnimatedImage({src, ...props}: AnimatedImageProps) {
  const [isOpen, setOpen] = useState(false);

  useDomEvent(useRef(window), 'scroll', () => isOpen && setOpen(false));

  return (
      <div className={`image-container ${isOpen ? 'open' : ''}`}>
        <motion.div
            animate={divAnimation[isOpen ? 'open' : 'closed']}
            transition={transition}
            className="shade"
            onClick={() => setOpen(false)}
        />
        <motion.img
            className="shadow-5"
            animate={imgAnimation[isOpen ? 'open' : 'closed']}
            src={props.srcZoom}
            alt={props.alt}
            onClick={() => setOpen(!isOpen)}
            transition={transition}
            whileHover={{scale: 1.05}}
            layout
        />
      </div>
  );
}
