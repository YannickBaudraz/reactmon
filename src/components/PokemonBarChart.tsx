import {Chart} from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Color from 'color';
import React from 'react';
import {Pokemon} from '../types/pokemon';
import {RankingColor} from '../lib/color';

interface PokemonBarChartProps {
  pokemon: Pokemon;
  className?: string;
}

export function PokemonBarChart({pokemon, className}: PokemonBarChartProps) {
  const colorsByValue = Object.values(pokemon.stats).map((stat: number) => {
    if (stat < 50) return RankingColor.Horrible;
    if (stat < 70) return RankingColor.Bad;
    if (stat < 90) return RankingColor.Average;
    if (stat < 110) return RankingColor.Good;
    if (stat < 130) return RankingColor.Great;
    return RankingColor.Awesome;
  });
  const biggestValue = Math.max(...Object.values(pokemon.stats));

  return (
      <Chart
          type="bar"
          className={className}
          plugins={[ChartDataLabels]}
          data={{
            labels: [
              'HP',
              'Attack',
              'Defense',
              'Special Attack',
              'Special Defense',
              'Speed'
            ],
            datasets: [
              {
                label: pokemon.name,
                data: [
                  pokemon.stats.hp,
                  pokemon.stats.attack,
                  pokemon.stats.defense,
                  pokemon.stats.specialAttack,
                  pokemon.stats.specialDefense,
                  pokemon.stats.speed
                ],
                backgroundColor: colorsByValue.map((color) =>
                    Color(color).lighten(0.2).toString()
                )
              }]
          }}
          options={{
            responsive: true,
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: `${pokemon.name.capitalize()} stats`
              },
              datalabels: {
                anchor: 'end',
                align: 'end'
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                max: biggestValue + 5
              },
              y: {
                grid: {
                  display: false
                }
              }
            }
          }}
      />
  );
}
