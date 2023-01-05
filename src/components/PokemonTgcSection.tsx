import {Pokemon} from '../types/pokemon';
import {useQuery} from '@tanstack/react-query';
import {cardsByPokemonName} from '../queries/tcg-queries';
import Loader from './Loader';
import {Toast} from 'primereact/toast';
import {useEffect, useRef} from 'react';
import {AxiosError} from 'axios';
import {ApiErrorResponse} from '../types/tcg-api';

interface PokemonTgcSectionProps {
  pokemon: Pokemon;
}

export function PokemonTgcSection({pokemon}: PokemonTgcSectionProps) {
  const {isLoading, isError, data: cards, error} = useQuery(cardsByPokemonName(pokemon.name));
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (toast.current && isError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message = axiosError.response?.data.error.message || axiosError.message;
      // Because the toast has no animation without a timeout
      setTimeout(() => toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message
      }), 1);
    }
  }, [isError]);

  if (isLoading) return <Loader/>;
  if (isError) return <Toast ref={toast}/>;

  return <>
    <div>
      {cards?.map(card => <div key={card.id}>
        <img src={card.images.small} alt={card.name}/>
      </div>)}
    </div>
  </>;
}
