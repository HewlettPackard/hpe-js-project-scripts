import React from 'react';
import useFetcher from '@hpe/fetcher';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, loading, error] = useFetcher(
    'api.openweathermap.org/data/2.5/weather?zip=94040,us',
  );
  console.log(data, loading, error);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
