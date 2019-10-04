import React from 'react';
import { useFetcher, useIntersection } from '@hpe/react-hooks';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, loading, error] = useFetcher(
    'https://api.openweathermap.org/data/2.5/weather?zip=27278&appid=18ef348ece45174572c5e3d4be8a8d69&units=imperial',
  );
  const [thingToWatch, entry] = useIntersection();
  const isVisible = entry.isIntersecting;

  return (
    <div className="App">
      <header className="App-header">
        {loading && <img src={logo} className="App-logo" alt="logo" />}
        {error && (
          <div>
            This error happened:{' '}
            <span style={{ background: '#d14545', padding: '2px 5px' }}>
              {error.toString()}
            </span>
          </div>
        )}
        {data && (
          <div>
            {data.name} is {data.main.temp} degrees.
          </div>
        )}
      </header>
      <div style={{ height: '100vh' }} />
      <div ref={thingToWatch}>
        <h1
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease-in',
          }}
        >
          Im now in view{' '}
          <span role="img" aria-label="eyes looking around">
            👀
          </span>
        </h1>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  );
}

export default App;
