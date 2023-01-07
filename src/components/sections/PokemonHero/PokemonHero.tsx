import React, {useState} from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonHeader} from './PokemonHeader';
import {PokemonInfo} from './PokemonInfo';
import anime from 'animejs';
import {AnimeTarget} from '../../../types/anime-js';

export function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  const [basicInfoAnimeTarget, setBasicInfoAnimeTarget] = useState<AnimeTarget>([]);
  const [statsAnimeTarget, setStatsAnimeTarget] = useState<AnimeTarget>([]);
  const [headerAnimeTarget, setHeaderAnimeTarget] = useState<AnimeTarget>([]);

  const onSvgAnimeComplete = () => {
    anime.timeline({
      autoplay: false
    }).add({
      targets: basicInfoAnimeTarget,
      translateX: ['-50rem', 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutElastic'

    }).add({
      targets: statsAnimeTarget,
      translateX: ['50rem', 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutElastic'

    }, '-=2000').add({
      targets: headerAnimeTarget,
      opacity: [0, 1],
      easing: 'easeOutExpo'
    }).play();
  };

  return (
      <div className="flex flex-column justify-content-around"
           style={{height: 'calc(100vh - 4rem)'}}
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
}
