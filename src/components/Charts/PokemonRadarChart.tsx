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
  const colorObject = Color(uiColor);
  const colorLightness: number = colorObject.lightness() > 80 ? 80 : colorObject.lightness();

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
    backgroundColor: Color(uiColor).fade(.25).lightness(colorLightness).toString(),
    borderWidth: 0,
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
                min: 0,
                ticks: {
                  stepSize: 20,
                }
              }
            },
            elements: {
              line: {
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                hoverBorderJoinStyle: 'round',
                hoverBorderCapStyle: 'round',
              },
              point: {
                radius: 0,
                hoverRadius: 0,
              },
            }
          }}
      />
  );
}
