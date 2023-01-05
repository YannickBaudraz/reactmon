import {Pokemon} from '../types/pokemon';
import {useQuery} from '@tanstack/react-query';
import {cardsByPokemonName} from '../queries/tcg-queries';
import Loader from './Loader';
import {Toast} from 'primereact/toast';
import {useEffect, useRef} from 'react';
import {AxiosError} from 'axios';
import {ApiErrorResponse} from '../types/tcg-api';
import {Image} from 'primereact/image';

interface PokemonTcgSectionProps {
  pokemon: Pokemon;
}

export function PokemonTcgSection({pokemon}: PokemonTcgSectionProps) {
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
        <Image
            src={card.images.small}
            zoomSrc={card.images.large}
            alt={card.name}
            preview
            downloadable
        />
      </div>)}
    </div>
  </>;
}
