import React, {useState} from 'react';
import {Button} from 'primereact/button';

import reactLogo from './assets/react.svg';
import {Card} from 'primereact/card';

function App() {
  const [count, setCount] = useState(0);

  return (
      <div className="grid">
        <div className="col-10 col-offset-1">
          <div className="surface-0">
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo"/>
              </a>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
            </div>
            <h1>Vite + PrimeReact</h1>
            <div>
              <h2>PrimeReact Typescript Issue Template</h2>
              <p>
                Please create a test case and attach the link to the to your github
                issue report.
              </p>
            </div>
            <Card title={'Counter'}>
              <Button
                  className="mr-2"
                  onClick={() => setCount((count) => count + 1)}
              >Count is {count}</Button>
              <p>
                Edit <code>src/App.tsx</code> and save to test PrimeReact
              </p>
            </Card>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </div>
        </div>
      </div>
  );
}

export default App;
