import {PokemonBasicInfo} from '../../PokemonBasicInfo/PokemonBasicInfo';
import {AnimatedSvg} from '../../Animated/AnimatedSvg';
import {PokemonStats} from '../../PokemonStats';
import React, {useEffect, useRef, useState} from 'react';
import {Pokemon} from '../../../types/pokemon';
import {SetState} from '../../../types/react';
import {AnimeTarget} from '../../../types/anime-js';
import {AnimatedImage} from '../../Animated/AnimatedImage';

interface PokemonHeroProps {
  pokemon: Pokemon;
  setBasicInfoAnimeTarget?: SetState<AnimeTarget>;
  setStatsAnimeTarget?: SetState<AnimeTarget>;
  onImageAnimeComplete?: () => void;
}

export function PokemonInfo(props: PokemonHeroProps) {
  const {pokemon, setBasicInfoAnimeTarget, setStatsAnimeTarget, onImageAnimeComplete} = props;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const basicInfoDivRef = useRef<HTMLDivElement>(null);
  const statsDivRef = useRef<HTMLDivElement>(null);

  const [imageContainerSize, setImageContainerSize] = useState({height: 0, width: 0});

  useEffect(() => {
    setBasicInfoAnimeTarget?.(basicInfoDivRef.current);
    setStatsAnimeTarget?.(statsDivRef.current);

    if (imageContainerRef.current) {
      const imageContainerXPosition = imageContainerRef.current.getBoundingClientRect().x;
      if (imageContainerXPosition < 100)
        imageContainerRef.current.style.height = `${102 - imageContainerXPosition}vh`;

      setImageContainerSize({
        height: imageContainerRef.current.getBoundingClientRect().height,
        width: imageContainerRef.current.getBoundingClientRect().width
      });
    }
  }, [pokemon]);

  return (
      <div className="grid">
        <div ref={imageContainerRef}
             className="col-12 flex justify-content-center max-w-full
                        lg:col-12
                        xl:flex-order-2 xl:col-4"
        >
          {pokemon?.sprites?.svg
              ? <AnimatedSvg
                  svgUrl={pokemon.sprites?.svg}
                  containerSize={imageContainerSize}
                  onLookingComplete={onImageAnimeComplete}
              />
              : <AnimatedImage
                  className="w-full h-full"
                  style={{objectFit: 'contain'}}
                  src={pokemon?.sprites?.official}
                  alt={`${pokemon?.name} image`}
                  onAnimeComplete={onImageAnimeComplete}
              />
          }
        </div>

        <div ref={basicInfoDivRef}
             className="col w-10 col-offset-1 my-auto
                        lg:w-5 md:col-offset-0 lg:flex lg:justify-content-center
                        xl:flex-order-1 xl:w-4"
        >
          <PokemonBasicInfo pokemon={pokemon}/>
        </div>

        <div className="col my-auto
                        xl:col-4 xl:flex-order-3"
        >
          <div ref={statsDivRef} className="">
            <PokemonStats pokemon={pokemon}/>
          </div>
        </div>
      </div>
  );
}
