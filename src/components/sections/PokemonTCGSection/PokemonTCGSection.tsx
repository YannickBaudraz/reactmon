import {Pokemon} from '../../../types/pokemon';
import {useQuery} from '@tanstack/react-query';
import {cardsByPokemonName} from '../../../queries/tcg-queries';
import Loader from '../../Loader';
import {Toast} from 'primereact/toast';
import React, {useEffect, useRef} from 'react';
import {AxiosError} from 'axios';
import {ApiErrorResponse} from '../../../types/tcg-api';
import {motion} from 'framer-motion';
import {PokemonCard} from '../../Animated/PokemonCard/PokemonCard';
import {isLg, isMd, isXl} from '../../../lib/responsive';

interface PokemonTCGSectionProps {
  pokemon: Pokemon;
}

const MotionPokemonCard = motion(PokemonCard);

export default function PokemonTCGSection({pokemon}: PokemonTCGSectionProps) {
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
    <div className="grid lg:col-10 lg:col-offset-1 align-items-center">
      {cards?.map((card, index) => (
          <motion.div
              key={card.id}
              initial="offScreen"
              whileInView="onScreen"
              viewport={{once: true, amount: .4}}
              className="col-6 md:col-4 lg:col-3 xl:col-2"
          >
            <MotionPokemonCard
                src={card.images.small}
                srcZoom={card.images.large}
                alt={`${card.name} - ${card.id}`}
                variants={{
                  offScreen: {
                    y: 300,
                    opacity: 0
                  },
                  onScreen: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: {
                        type: 'spring',
                        duration: .5,
                        bounce: .3,
                        delay: index % getCardByColumns() * 0.1
                      },
                    }
                  }
                }}
            />
          </motion.div>
      ))}
    </div>
  </>;

  function getCardByColumns() {
    switch (true) {
      case isXl():
        return 6;
      case isLg():
        return 4;
      case isMd():
        return 3;
      default:
        return 2;
    }
  }
}
