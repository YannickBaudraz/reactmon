import {Menubar} from 'primereact/menubar';
import {Link} from 'react-router-dom';
import {Button} from 'primereact/button';
import Color from 'color';
import React from 'react';

import './PokemonDetailsNavBar.scss';
import {getUIColor} from '../../../lib/color';

interface NavBarProps {
  color: string;
}

export default function PokemonDetailsNavBar({color}: NavBarProps) {
  const navBarColor = getUIColor(color);

  return (
      <Menubar
          className="top-bar px-3 h-4rem"
          start={<NavBarStart color={navBarColor}/>}
          style={{backgroundColor: navBarColor}}
      />
  );
}

function NavBarStart({color}: Pick<NavBarProps, 'color'>) {
  return (
      <Link className="p-reset" to="/">
        <Button
            label="Back"
            icon="pi pi-chevron-left"
            className="p-button-text p-button-plain"
            style={{
              color: Color(color).isLight()
                  ? Color('black').fade(.35).string()
                  : 'white'
            }}
        />
      </Link>
  );
}
