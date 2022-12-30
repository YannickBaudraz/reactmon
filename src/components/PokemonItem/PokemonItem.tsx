import {Card} from 'primereact/card';
import React, {useCallback, useRef, useState} from 'react';
import './PokemonItem.scss';
import {DivMouseEvent} from '../../types/events';
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

  const toggleClickable = useCallback(({currentTarget: el}: DivMouseEvent) => {
    if (el.style.cursor !== 'pointer') {
      el.style.cursor = 'pointer';
      el.classList.add('shadow-5');
    } else {
      el.style.cursor = 'default';
      el.classList.remove('shadow-5');
    }
  }, [pokemon]);

  return (
      <a href="#" className="p-reset">
        <Card
            title={pokemon.name.capitalize()}
            subTitle={pokemonId}
            className="pokemon-item col max-w-fit"
            onMouseOver={toggleClickable}
            onMouseOut={toggleClickable}
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
                });
                timeline.add({
                  opacity: 0,
                  duration: duration,
                  complete: () => {
                    timeline.pause();
                    setImgSrc(spriteSrc);
                  }
                });
                timeline.add({
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
      </a>
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
