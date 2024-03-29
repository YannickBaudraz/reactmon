import React, {useEffect, useRef, useState} from 'react';
import {Pokemon} from '../../../types/pokemon';
import PokemonHeader from './PokemonHeader';
import PokemonInfo from './PokemonInfo';
import anime from 'animejs';
import {AnimeTarget} from '../../../types/anime-js';
import {isXl} from '../../../lib/responsive';

export default function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  const heroRef = useRef<HTMLDivElement>(null);

  const [basicInfoAnimeTarget, setBasicInfoAnimeTarget] = useState<AnimeTarget>([]);
  const [statsAnimeTarget, setStatsAnimeTarget] = useState<AnimeTarget>([]);
  const [headerAnimeTarget, setHeaderAnimeTarget] = useState<AnimeTarget>([]);
  const [onImageAnimeComplete, setOnImageAnimeComplete] = useState<() => void>();

  const timeline = getAnimationTimeline();

  useEffect(() => {
    if (!basicInfoAnimeTarget || !statsAnimeTarget || !headerAnimeTarget)
      return;

    setOnImageAnimeComplete(() => () => timeline.play());
  }, [basicInfoAnimeTarget, statsAnimeTarget, headerAnimeTarget]);

  return (
      <div ref={heroRef}
           className="flex flex-column justify-content-around overflow-x-hidden mt-4 xl:mt-0"
           style={{
             height: isXl() ? 'calc(100vh - 4rem)' : 'auto',
             opacity: 0
           }}
      >
        <PokemonHeader pokemon={pokemon} setHeaderAnimeTarget={setHeaderAnimeTarget}/>
        <PokemonInfo
            pokemon={pokemon}
            setBasicInfoAnimeTarget={setBasicInfoAnimeTarget}
            setStatsAnimeTarget={setStatsAnimeTarget}
            onImageAnimeComplete={onImageAnimeComplete}
        />
      </div>
  );

  function getAnimationTimeline() {
    const infoDuration = 2000;
    const infoEasing: anime.AnimeParams['easing'] = 'easeOutElastic(1, .5)';
    const animeInstance = anime;
    anime.set([basicInfoAnimeTarget, statsAnimeTarget, headerAnimeTarget], {opacity: 0});
    anime.set(heroRef.current, {opacity: 1});

    return animeInstance.timeline({
      autoplay: false
    }).add({
      targets: headerAnimeTarget,
      opacity: [0, 1],
      easing: 'easeOutExpo'
    }).add({
      targets: basicInfoAnimeTarget,
      translateX: ['-10rem', 0],
      opacity: [0, 1],
      duration: infoDuration,
      easing: infoEasing
    }).add({
      targets: statsAnimeTarget,
      translateX: ['10rem', 0],
      opacity: [0, 1],
      duration: infoDuration,
      easing: infoEasing
    }, `-=${infoDuration}`);
  }
}
