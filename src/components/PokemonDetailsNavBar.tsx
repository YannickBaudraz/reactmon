import {Menubar} from 'primereact/menubar';
import {Link} from 'react-router-dom';
import {Button} from 'primereact/button';

interface NavBarProps {
  color: string;
}

export default function PokemonDetailsNavBar({color}: NavBarProps) {
  return (
      <Menubar
          className="px-3 h-4rem"
          start={<NavBarStart/>}
          style={{
            backgroundColor: color,
            borderColor: 'transparent',
            borderRadius: '0'
          }}
      />
  );
}

function NavBarStart() {
  return (
      <Link to="/">
        <Button
            label="Back"
            icon="pi pi-arrow-left"
            className="p-button-link p-button-text"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              color: 'white'
            }}
        />
      </Link>
  );
}
