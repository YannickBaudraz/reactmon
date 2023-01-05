import {Pokemon} from '../../../types/pokemon';
import {useQuery} from '@tanstack/react-query';
import {cardsByPokemonName} from '../../../queries/tcg-queries';
import Loader from '../../Loader';
import {Toast} from 'primereact/toast';
import React, {useEffect, useRef} from 'react';
import {AxiosError} from 'axios';
import {ApiErrorResponse} from '../../../types/tcg-api';
import {AnimatedImage} from '../../Animated/AnimatedImage/AnimatedImage';

interface PokemonTcgSectionProps {
  pokemon: Pokemon;
}

export function PokemonTcgSection({pokemon}: PokemonTcgSectionProps) {
  const {isLoading, isError, data: cards, error} = useQuery(cardsByPokemonName(pokemon.name));
  const toast = useRef<Toast>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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
    <div className="grid col-8 col-offset-2 align-items-center">
      {cards?.map(card => (
          <div
              key={card.id}
              className="col-3 text-center"
          >
            <AnimatedImage
                src={card.images.small}
                srcZoom={card.images.large}
                alt={`${card.name} - ${card.id}`}
            />
          </div>
      ))}
    </div>
  </>;
}
