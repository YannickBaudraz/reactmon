import {InputText} from 'primereact/inputtext';
import React from 'react';

interface SearchProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({onSearch}: SearchProps) {
  return <>
    <span className="p-input-icon-left">
      <i className="pi pi-search"/>
      <InputText
          placeholder="Search"
          type="search"
          className="p-inputtext-sm"
          onChange={onSearch}
      />
    </span>
  </>;
}
