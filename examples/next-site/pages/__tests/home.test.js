import React from 'react';
import { reactTestRenderer } from '@hpe/project-tests';
import Home from '../index';
import PageTwo from '../pageTwo';

test('Home renders', () => {
  const component = reactTestRenderer.create(
    <Home data={{ name: 'test', main: { temp: 7000 } }} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Page Two renders', () => {
  const component = reactTestRenderer.create(
    <PageTwo data={{ name: 'test', main: { temp: 7000 } }} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
