import React from 'react';
import { useFetcher, useIntersection } from '@hpe/react-hooks';

function App() {
  const [data, loading, error] = useFetcher(
    'https://api.openweathermap.org/data/2.5/weather?zip=27278&appid=18ef348ece45174572c5e3d4be8a8d69&units=imperial',
  );
  const [thingToWatch, entry] = useIntersection();
  const isVisible = entry.isIntersecting;

  return (
    <div className="App">
      <header className="App-header">
        {loading && <p>Loading...</p>}
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
      <div
        ref={thingToWatch}
        style={{
          textAlign: 'center',
        }}
      >
        <span
          style={{
            opacity: isVisible ? 1 : 0,
            display: 'block',
            transform: `translateY(${isVisible ? 0 : 30}vh) translateX(${
              isVisible ? 0 : -30
            }vw) rotate(${isVisible ? 10 : -45}deg)`,
            transition: 'opacity 0.25s ease-in, transform 1s ease-out',
            fontSize: '100px',
            lineHeight: '50px',
          }}
          role="img"
          aria-label="eyes looking around"
        >
          🚀
        </span>
        <h1
          style={{
            opacity: isVisible ? 1 : 0,
            display: 'block',
            transform: `translateY(${isVisible ? 0 : 5}vh)`,
            transition: 'opacity 0.25s linear, transform 0.5s ease-out',
            transitionDelay: '0.5s',
            fontSize: '50px',
          }}
        >
          Hi!
        </h1>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  );
}

export default App;
