import React from 'react';
import { reactTestRenderer } from '@hpe/project-tests';
import App from '../App';

test('App renders', () => {
  const component = reactTestRenderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
