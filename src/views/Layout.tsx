import React from 'react';
import NavBar, {NavBarProps} from '../components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  navBarProps: NavBarProps;
}

export default function Layout({navBarProps, children}: LayoutProps) {
  return (
      <>
        <NavBar onSearch={navBarProps.onSearch}/>

        <div className="px-2">
          <div className="surface-0">
            {children}
          </div>
        </div>
      </>
  );
}
