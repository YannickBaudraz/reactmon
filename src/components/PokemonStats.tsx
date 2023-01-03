import {Pokemon} from '../types/pokemon';
import React, {useCallback} from 'react';
import {PokemonBarChart} from './PokemonBarChart';
import {PokemonRadarChart} from './PokemonRadarChart';
import {ToggleButton, ToggleButtonChangeParams} from 'primereact/togglebutton';

export function PokemonStats({pokemon}: { pokemon: Pokemon }) {
  const [chartType, setChartType] = React.useState<'bar' | 'radar'>('bar');
  const onChange = useCallback((e: ToggleButtonChangeParams) => setChartType(e.value ? 'bar' : 'radar'), []);
  const isBar = chartType === 'bar';

  return (
      <div className="flex flex-column justify-content-between flex-wrap">
        <ToggleButton
            className="w-4 mx-auto"
            checked={isBar}
            onChange={onChange}
            onLabel="Radar"
            offLabel="Bar"
        />
        {isBar
            ? <PokemonBarChart pokemon={pokemon}/>
            : <PokemonRadarChart pokemon={pokemon}/>
        }
        <div></div>
      </div>
  );
}
