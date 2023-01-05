import {Pokemon} from '../types/pokemon';
import {useQuery} from '@tanstack/react-query';
import {cardsByPokemonName} from '../queries/tcg-queries';

interface PokemonTgcSectionProps {
  pokemon: Pokemon;
}

export function PokemonTgcSection({pokemon}: PokemonTgcSectionProps) {
  const {isLoading, isError, data: cards, error} = useQuery(cardsByPokemonName(pokemon.name));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
      <div>
        {cards.map(card => (
            <div key={card.id}>
              <img src={card.images.small} alt={card.name}/>
            </div>
        ))}
      </div>
  );
}
