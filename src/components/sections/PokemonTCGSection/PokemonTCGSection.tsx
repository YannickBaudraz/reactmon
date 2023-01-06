import {Pokemon} from '../../../types/pokemon';
import {useQuery} from '@tanstack/react-query';
import {cardsByPokemonName} from '../../../queries/tcg-queries';
import Loader from '../../Loader';
import {Toast} from 'primereact/toast';
import React, {useEffect, useRef} from 'react';
import {AxiosError} from 'axios';
import {ApiCard, ApiErrorResponse} from '../../../types/tcg-api';
import {motion} from 'framer-motion';
import LazyLoad from 'react-lazyload';
import {AnimatableImage} from '../../Animated/AnimatableImage/AnimatableImage';

const MotionImage = motion(AnimatableImage);

interface PokemonTCGSectionProps {
  pokemon: Pokemon;
}

export function PokemonTCGSection({pokemon}: PokemonTCGSectionProps) {
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

  const numberOfCardByColumn = 6;
  return <>
    <div className="grid col-10 col-offset-1 align-items-center">
      {cards?.map((card, index) => (
          <AnimatedPokemonTCG
              key={card.id}
              card={card}
              className={`col-${12 / numberOfCardByColumn}`}
              positionInColumn={index % numberOfCardByColumn}
          />
      ))}
    </div>
  </>;
}

interface AnimatedPokemonTCGProps {
  card: ApiCard;
  positionInColumn: number;
  className: string;
}

function AnimatedPokemonTCG({card, positionInColumn, className}: AnimatedPokemonTCGProps) {
  const variants = {
    offScreen: {
      y: 300
    },
    onScreen: {
      y: 0,
      transition: {
        type: 'spring',
        bounce: .3,
        duration: .5,
        delay: positionInColumn * .1
      },
      transitionEnd: {
        opacity: undefined
      }
    }
  };

  return (
      <motion.div
          key={card.id}
          className={className}
          initial="offScreen"
          whileInView="onScreen"
          viewport={{once: true, amount: .33}}
      >
        <LazyLoad height="100%" offset={300} once>
          <MotionImage
              src={card.images.small}
              srcZoom={card.images.large}
              alt={`${card.name} - ${card.id}`}
              variants={variants}
          />
        </LazyLoad>
      </motion.div>
  );
}
