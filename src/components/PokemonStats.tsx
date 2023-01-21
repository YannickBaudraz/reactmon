import {Pokemon} from '../types/pokemon';
import React, {useCallback} from 'react';
import PokemonBarChart from './Charts/PokemonBarChart';
import PokemonRadarChart from './Charts/PokemonRadarChart';
import {ToggleButton, ToggleButtonChangeParams} from 'primereact/togglebutton';

export default function PokemonStats({pokemon}: { pokemon: Pokemon }) {
  const [chartType, setChartType] = React.useState<'bar' | 'radar'>('radar');
  const onChange = useCallback((e: ToggleButtonChangeParams) => setChartType(e.value ? 'bar' : 'radar'), []);
  const isBar = chartType === 'bar';

  return (
      <div className="flex flex-column justify-content-between flex-wrap gap-3">
        <ToggleButton
            className="w-4 mx-auto p-button-secondary p-button-outlined"
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
