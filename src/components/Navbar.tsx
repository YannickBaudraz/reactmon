import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Menubar} from 'primereact/menubar';
import {Image} from 'primereact/image';

export interface NavBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NavBar({onSearch}: NavBarProps) {
  return <Menubar className="px-3" start={<NavBarStart/>} end={<NavBarEnd onSearch={onSearch}/>}/>;
}

function NavBarStart() {
  return <a href="/"><Image src="/pokedex-logo.png" alt="Logo" width="37"/></a>;
}

function NavBarEnd({onSearch}: Partial<NavBarProps>) {
  return <span className="p-input-icon-left">
    <i className="pi pi-search"/>
    <InputText
        placeholder="Search"
        type="search"
        className="p-inputtext-sm"
        onChange={onSearch}
    />
  </span>;
}

