import {Card} from 'primereact/card';
import React, {useRef, useState} from 'react';
import './PokemonItem.scss';
import {IPokemonBulkResult} from '../../types/poke-api';
import {motion} from 'framer-motion';
import anime from 'animejs';
import placeholderSrc from '/pokemon-item-placeholder.png';

interface PokemonItemProps {
  pokemon: IPokemonBulkResult;
}

export default function PokemonItem({pokemon}: PokemonItemProps) {
  const pokemonId = pokemon.url.split('/')[6];
  const spriteSrc = `${import.meta.env.VITE_OFFICIAL_PNG_URL}/${pokemonId}.png`;
  const imgSize = getImageSizeByViewport();

  const itemImgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState(placeholderSrc);

  return (
      <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: '3px 3px 10px 5px rgba(0,0,0,0.07)'
          }}
      >
        <Card
            title={pokemon.name.capitalize()}
            subTitle={pokemonId}
            className="pokemon-item col max-w-fit"
        >
          <motion.img
              ref={itemImgRef}
              src={imgSrc}
              alt={pokemon.name + ' image'}
              width={imgSize}
              height={imgSize}
              viewport={{once: true}}
              onViewportEnter={e => {
                if (!e) return;

                itemImgRef.current!.onload = null;

                const duration = 500;
                const timeline = anime.timeline({
                  targets: itemImgRef.current,
                  duration: duration,
                  easing: 'easeInOutSine'
                }).add({
                  opacity: 0,
                  duration: duration,
                  complete: () => {
                    setImgSrc(spriteSrc);
                    timeline.pause();
                  }
                }).add({
                  delay: duration / 4,
                  opacity: 1
                });

                itemImgRef.current!.onload = () => {
                  if (itemImgRef.current!.src === spriteSrc) {
                    timeline.play();
                  }
                };
              }}
          />
        </Card>
      </motion.div>
  );
}

function getImageSizeByViewport() {
  const viewports = {
    'sm': {innerWidth: 768, size: 135},
    'md': {innerWidth: 1024, size: 190},
    'lg': {innerWidth: 1280, size: 225}
  };

  const size = Object.values(viewports).find(({innerWidth}) => innerWidth >= window.innerWidth)?.size;

  return size || viewports.lg.size;
}
