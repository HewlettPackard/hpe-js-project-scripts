import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import { useIntersection, useEntryPosition } from '@hpe/react-hooks';
import { Box, Heading } from 'grommet';

const Home = ({ data, error }) => {
  const [thingToWatch, entry] = useIntersection();
  const isVisible = entry.isIntersecting;
  const [boxPosToWatch, { direction, elementIs }] = useEntryPosition();

  return (
    <Box align="center" margin="large">
      <Heading size="xlarge">Home Page</Heading>
      {error && <Heading>this error happened: {error}</Heading>}
      {!data && !error && <Heading>Loading...</Heading>}
      {data && (
        <Heading>
          {data.name} is {data.main.temp} degrees.
        </Heading>
      )}
      <Link href="/test">
        <a>Next Page</a>
      </Link>
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
      <div
        ref={boxPosToWatch}
        style={{
          display: 'inline-block',
          padding: '20px',
          border: `${elementIs === 'visible' ? 'green' : 'red'} 3px solid`,
          transition: 'border-color 1s linear',
          textAlign: 'center',
          lineHeight: 1,
        }}
      >
        <h1>
          You are scrolling {direction} {direction === 'up' ? '⬆️' : '⬇️️'}{' '}
          while
          <br />
          element is <u>{elementIs}</u> in the window.
        </h1>
      </div>
      <div style={{ height: '100vh' }} />
    </Box>
  );
};

// Next.js would not use the @hpe/fetcher util as it has
// its own method for data fetching
Home.getInitialProps = async () => {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?zip=27278&appid=18ef348ece45174572c5e3d4be8a8d69&units=imperial',
    );
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

Home.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
  }).isRequired,
  error: PropTypes.string,
};

export default Home;
