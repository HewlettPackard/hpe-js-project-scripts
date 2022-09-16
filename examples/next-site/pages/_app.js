import React from 'react';
import PropTypes from 'prop-types';
import { Grommet, grommet as grommetTheme } from 'grommet';

function App({ Component, pageProps }) {
  return (
    <Grommet theme={grommetTheme}>
      <Component {...pageProps} />
    </Grommet>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
