import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Menubar} from 'primereact/menubar';
import {Image} from 'primereact/image';

export interface NavBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NavBar({onSearch}: NavBarProps) {
  const start = <a href="/"><Image src="/pokedex-logo.png" alt="Logo" width="37"/></a>;

  const end = <InputText
      placeholder="Search"
      type="search"
      className="p-inputtext-sm"
      onChange={onSearch}
  />;

  return <Menubar start={start} end={end} className="px-3"/>;
}
