import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Heading } from 'grommet';

const Test = ({ data, error }) => {
  return (
    <Box align="center" margin="large">
      <Heading size="xlarge">Next Page</Heading>
      {error && <Heading>this error happened: {error}</Heading>}
      {!data && !error && <Heading>Loading...</Heading>}
      {data && (
        <Heading>
          {data.name} is {data.main.temp} degrees.
        </Heading>
      )}
      <Link href="/">
        <a>Home Page</a>
      </Link>
    </Box>
  );
};

// Next.js would not use the @hpe/fetcher util as it has
// its own method for data fetching
Test.getInitialProps = async () => {
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

Test.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
  }).isRequired,
  error: PropTypes.string,
};

export default Test;
