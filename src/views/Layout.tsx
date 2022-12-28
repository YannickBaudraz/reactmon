import React from 'react';
import NavBar from '../components/Navbar';

export default function Layout({children}: { children: React.ReactNode }) {
  return (
      <>
        <NavBar/>

        <div className="px-2">
          <div className="surface-0">
            {children}
          </div>
        </div>
      </>
  );
}
