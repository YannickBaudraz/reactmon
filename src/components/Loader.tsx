import {ProgressSpinner} from 'primereact/progressspinner';
import React from 'react';

export default function Loader() {
  return (
      <div className="flex justify-content-center">
        <ProgressSpinner/>
      </div>
  );
}
