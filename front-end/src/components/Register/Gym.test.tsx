import { render} from '@testing-library/react';
import React from 'react';
import Gym from './Gym';

test('renders without crashing', async() => {
  const{baseElement} = await render(<Gym handleChange={null} next={null} prev={null}/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} =await render(<Gym handleChange={null} next={null} prev={null} />);
  expect (baseElement).toHaveTextContent("Please select your gym*");
});
