import {Pokemon} from '../../types/pokemon';
import {getUIColor} from '../../lib/color';
import {Radar} from 'react-chartjs-2';
import {ChartDataset} from 'chart.js/dist/types';
import Color from 'color';

interface PokemonRadarChartProps {
  pokemon: Pokemon;
  className?: string;
}

export function PokemonRadarChart({pokemon, className}: PokemonRadarChartProps) {
  const uiColor = getUIColor(pokemon.color);

  const dataset: ChartDataset<'radar', number[]> = {
    label: pokemon.name,
    data: [
      pokemon.stats.hp,
      pokemon.stats.defense,
      pokemon.stats.specialDefense,
      pokemon.stats.speed,
      pokemon.stats.specialAttack,
      pokemon.stats.attack
    ],
    backgroundColor: Color(uiColor).fade(.1).toString(),
    showLine: false,
    pointRadius: 0,
    pointHoverRadius: 0
  };

  return (
      <Radar
          className={className}
          data={{
            labels: ['HP', 'Defense', 'Sp. Def', 'Speed', 'Sp. Atk', 'Attack'],
            datasets: Array.of(dataset)
          }}
          options={{
            interaction: {
              intersect: false,
              mode: 'dataset'
            },
            scales: {
              r: {
                min: 0
              }
            }
          }}
      />
  );
}
