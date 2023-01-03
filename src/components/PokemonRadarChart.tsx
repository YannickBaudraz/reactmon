import {Pokemon} from '../types/pokemon';
import {Chart} from 'primereact/chart';
import {getUIColor} from '../lib/color';

interface PokemonRadarChartProps {
  pokemon: Pokemon;
  className?: string;
}

export function PokemonRadarChart({pokemon, className}: PokemonRadarChartProps) {
  const uiColor = getUIColor(pokemon.color);

  return (
      <Chart
          type="radar"
          className={className}
          data={{
            labels: [
              'HP',
              'Defense',
              'Sp. Def',
              'Speed',
              'Sp. Atk',
              'Attack'
            ],
            datasets: [{
              label: pokemon.name,
              data: [
                pokemon.stats.hp,
                pokemon.stats.defense,
                pokemon.stats.specialDefense,
                pokemon.stats.speed,
                pokemon.stats.specialAttack,
                pokemon.stats.attack
              ],
              pointBorderWidth: 0,
              pointRadius: 0,
              showLine: false,
              showPoint: false,
              backgroundColor: uiColor,
            }]
          }}
          options={{
            interaction: {
              intersect: false,
              mode: 'index',
              axis: 'xy'
            },
            scales: {
              r: {
                min: 0
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }}
      />
  );
}
