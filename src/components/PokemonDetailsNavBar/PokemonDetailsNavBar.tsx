import {Menubar} from 'primereact/menubar';
import {Link} from 'react-router-dom';
import {Button} from 'primereact/button';
import Color from 'color';
import React from 'react';

import './PokemonDetailsNavBar.scss';

interface NavBarProps {
  color: string;
}

export default function PokemonDetailsNavBar({color}: NavBarProps) {
  let navBarColor = color === 'white'
      ? Color('#d5dbe1').darken(.01).string()
      : Color(color).desaturate(0.33).fade(0.33).string();

  return (
      <Menubar
          className="px-3 h-4rem"
          start={<NavBarStart color={navBarColor}/>}
          style={{
            backgroundColor: navBarColor,
            borderColor: 'transparent',
            borderRadius: '0',
            boxShadow: '0 0 40px 8px rgb(0 0 0 / 18%)'
          }}
      />
  );
}

function NavBarStart({color}: NavBarProps) {
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
