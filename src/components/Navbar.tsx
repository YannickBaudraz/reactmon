import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Menubar} from 'primereact/menubar';

export interface NavBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NavBar({onSearch}: NavBarProps) {
  const start = <>
    <a href="/">
      <img alt="logo"
           src="public/pokedex-logo.png"
           height="40"
           className="mr-2"/>
    </a>
  </>;

  const end = <InputText
      placeholder="Search"
      type="search"
      className="p-inputtext-sm"
      onChange={onSearch}
  />;

  return (
      <Menubar start={start} end={end} className="px-3"/>
  );
}
