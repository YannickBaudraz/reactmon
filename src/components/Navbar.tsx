import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Menubar} from 'primereact/menubar';

export default function NavBar() {
  const start = <img alt="logo"
                     src="public/vite.svg"
                     height="40"
                     className="mr-2"/>;

  const end = <InputText placeholder="Search" type="text"/>;

  return (
      <div>
        <div className="card">
          <Menubar start={start} end={end}/>
        </div>
      </div>
  );
}
