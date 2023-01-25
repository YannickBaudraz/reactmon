import {Card} from 'primereact/card';
import React, {useRef, useState} from 'react';
import './PokemonItem.scss';
import {ApiNamedResource} from '../../types/poke-api';
import {motion} from 'framer-motion';
import anime from 'animejs';
import placeholderSrc from '/pokemon-item-placeholder.png';
import {Link} from 'react-router-dom';
import {getIdFromPokeApiURl} from '../../lib/pokemon';

interface PokemonItemProps {
  pokemon: ApiNamedResource;
}

export default function PokemonItem({pokemon}: PokemonItemProps) {
  const pokemonId = getIdFromPokeApiURl(pokemon.url);
  const spriteSrc = `${import.meta.env.VITE_OFFICIAL_PNG_URL}/${pokemonId}.png`;

  const itemImgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState(placeholderSrc);

  return (
      <motion.div
          className="h-full"
          whileHover={{
            scale: 1.05,
            boxShadow: '3px 3px 10px 5px rgba(0,0,0,0.07)'
          }}
      >
        <Link to={`/pokemon/${pokemonId}`}>
          <Card
              title={pokemon.name.capitalize()}
              subTitle={pokemonId}
              className="pokemon-item"
          >
            <motion.img
                ref={itemImgRef}
                src={imgSrc}
                alt={pokemon.name + ' image'}
                viewport={{once: true}}
                onViewportEnter={onViewportEnter}
            />
          </Card>
        </Link>
      </motion.div>
  );

  function onViewportEnter(e: IntersectionObserverEntry | null) {
    if (!e)
      return;

    itemImgRef.current!.onload = null;

    const duration = 750;
    const timeline = anime.timeline({
      targets: itemImgRef.current,
      duration: duration,
      easing: 'easeInSine'
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

    if (itemImgRef.current)
      itemImgRef.current.onload = () => itemImgRef.current?.src === spriteSrc && timeline.play();
  }
}
