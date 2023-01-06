import {PokemonBasicInfo} from '../../PokemonBasicInfo/PokemonBasicInfo';
import {AnimatedSvg} from '../../Animated/AnimatedSvg';
import {PokemonStats} from '../../PokemonStats';
import React, {useRef} from 'react';
import {Pokemon} from '../../../types/pokemon';

export function PokemonInfo({pokemon}: { pokemon: Pokemon }) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageContainerSize, setImageContainerSize] = React.useState({height: 0, width: 0});

  React.useEffect(() => {
    if (imageContainerRef.current) {
      setImageContainerSize({
        height: imageContainerRef.current.getBoundingClientRect().height,
        width: imageContainerRef.current.getBoundingClientRect().width,
      });
    }
  }, [pokemon]);

  return (
      <div className="grid">
        <div className="col-4 w-2 m-auto">
          <PokemonBasicInfo pokemon={pokemon}/>
        </div>

        <div className="col-4" ref={imageContainerRef}>
          {pokemon?.sprites?.svg
              ? <AnimatedSvg svgUrl={pokemon.sprites?.svg} containerSize={imageContainerSize}/>
              : <img src={pokemon?.sprites?.official} alt={`${pokemon?.name} image`}/>
          }
        </div>

        <div className="col-4 my-auto px-3">
          <PokemonStats pokemon={pokemon}/>
        </div>
      </div>
  );
}
