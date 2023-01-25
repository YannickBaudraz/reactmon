import React from 'react';
import {Menubar} from 'primereact/menubar';
import {Image} from 'primereact/image';
import Search from '../Search';

export interface NavBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AllPokemonNavbar({onSearch}: NavBarProps) {
  return (
      <Menubar
          className="px-3 h-4rem"
          start={<NavBarStart/>}
          end={<NavBarEnd onSearch={onSearch}/>}
      />
  );
}

function NavBarStart() {
  return <Image src="/pokedex-logo.png" alt="Logo" width="37"/>;
}

function NavBarEnd({onSearch}: Pick<NavBarProps, 'onSearch'>) {
  return <Search onSearch={onSearch}/>;
}

