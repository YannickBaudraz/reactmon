import {PokemonBasicInfo} from '../../PokemonBasicInfo/PokemonBasicInfo';
import {AnimatedSvg} from '../../Animated/AnimatedSvg';
import {PokemonStats} from '../../PokemonStats';
import React, {useEffect, useRef, useState} from 'react';
import {Pokemon} from '../../../types/pokemon';
import {SetState} from '../../../types/react';
import {AnimeTarget} from '../../../types/anime-js';

interface PokemonHeroProps {
  pokemon: Pokemon;
  setBasicInfoAnimeTarget?: SetState<AnimeTarget>;
  setStatsAnimeTarget?: SetState<AnimeTarget>;
}

export function PokemonInfo(props: PokemonHeroProps) {
  const {pokemon, setBasicInfoAnimeTarget, setStatsAnimeTarget} = props;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const basicInfoDivRef = useRef<HTMLDivElement>(null);
  const statsDivRef = useRef<HTMLDivElement>(null);

  const [imageContainerSize, setImageContainerSize] = useState({height: 0, width: 0});

  useEffect(() => {
    setBasicInfoAnimeTarget?.(basicInfoDivRef.current);
    setStatsAnimeTarget?.(statsDivRef.current);

    if (imageContainerRef.current) {
      setImageContainerSize({
        height: imageContainerRef.current.getBoundingClientRect().height,
        width: imageContainerRef.current.getBoundingClientRect().width
      });
    }
  }, [pokemon]);

  return (
      <div className="grid">
        <div ref={basicInfoDivRef} className="col-4 col-offset-1 w-2 my-auto">
          <PokemonBasicInfo pokemon={pokemon}/>
        </div>

        <div className="col-4 col-offset-1 flex justify-content-center" ref={imageContainerRef}>
          {pokemon?.sprites?.svg
              ? <AnimatedSvg
                  svgUrl={pokemon.sprites?.svg}
                  containerSize={imageContainerSize}
              />
              : <img src={pokemon?.sprites?.official} alt={`${pokemon?.name} image`}/>
          }
        </div>

        <div className="col-4 my-auto flex justify-content-center">
          <div ref={statsDivRef} className="w-9">
            <PokemonStats pokemon={pokemon}/>
          </div>
        </div>
      </div>
  );
}
