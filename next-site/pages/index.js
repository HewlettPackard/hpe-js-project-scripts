import React from 'react';
import { Anchor, Box, Heading, Paragraph } from 'grommet';

export default () => (
  <Box align="center" margin="large" test2="test" test3="test">
    <Heading>Grommet is awesome!</Heading>
    <Paragraph>
      Find out more at{' '}
      <Anchor href="https://v2.grommet.io/">https://v2.grommet.io/</Anchor>
    </Paragraph>
  </Box>
);
