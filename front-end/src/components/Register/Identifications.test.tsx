import {render} from '@testing-library/react';
import React from 'react';
import Identifications from './Identifications';

test('renders without crashing', async() => {
  const{baseElement} = render(<Identifications handleChange={undefined} next={undefined} history={undefined}/>);
  expect (baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Identifications handleChange={undefined} next={undefined} history={undefined}/>);
  expect (baseElement).toHaveTextContent("Full Name*");
  expect (baseElement).toHaveTextContent("Username*");
});
