import {useLocation} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import AnimatedOutlet from '../routing/AnimatedOutlet';
import React from 'react';

export default function Root() {
  const location = useLocation();

  return <>
    <AnimatePresence mode="popLayout">
      <motion.div
          key={location.pathname}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: .5}}
      >
        <AnimatedOutlet/>
      </motion.div>
    </AnimatePresence>
  </>;
}
