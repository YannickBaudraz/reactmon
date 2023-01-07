import React, {useEffect, useRef, useState} from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonHeader} from './PokemonHeader';
import {PokemonInfo} from './PokemonInfo';
import anime from 'animejs';
import {AnimeTarget} from '../../../types/anime-js';

export function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  const heroRef = useRef<HTMLDivElement>(null);

  const [basicInfoAnimeTarget, setBasicInfoAnimeTarget] = useState<AnimeTarget>([]);
  const [statsAnimeTarget, setStatsAnimeTarget] = useState<AnimeTarget>([]);
  const [headerAnimeTarget, setHeaderAnimeTarget] = useState<AnimeTarget>([]);
  const [onSvgAnimeComplete, setOnSvgAnimeComplete] = useState<() => void>();

  const timeline = initAnimationTimeline();

  useEffect(() => {
    if (!basicInfoAnimeTarget || !statsAnimeTarget || !headerAnimeTarget)
      return;
    setOnSvgAnimeComplete(() => () => timeline.play());
  }, [basicInfoAnimeTarget, statsAnimeTarget, headerAnimeTarget]);

  return (
      <div ref={heroRef}
           className="flex flex-column justify-content-around overflow-x-hidden"
           style={{height: 'calc(100vh - 4rem)', opacity: 0}}
      >
        <PokemonHeader pokemon={pokemon} setHeaderAnimeTarget={setHeaderAnimeTarget}/>
        <PokemonInfo
            pokemon={pokemon}
            setBasicInfoAnimeTarget={setBasicInfoAnimeTarget}
            setStatsAnimeTarget={setStatsAnimeTarget}
            onSvgAnimeComplete={onSvgAnimeComplete}
        />
      </div>
  );

  function initAnimationTimeline() {
    const infoDuration = 2000;
    const infoEasing: anime.AnimeParams['easing'] = 'easeOutElastic(1, .5)';
    const animeInstance = anime;
    anime.set([basicInfoAnimeTarget, statsAnimeTarget, headerAnimeTarget], {opacity: 0});
    anime.set(heroRef.current, {opacity: 1});
    return animeInstance.timeline({
      autoplay: false
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
    }, `-=${infoDuration}`).add({
      targets: headerAnimeTarget,
      opacity: [0, 1],
      easing: 'easeOutExpo'
    }, '-=500');
  }
}
