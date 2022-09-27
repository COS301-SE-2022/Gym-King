import { act, render} from '@testing-library/react';
import React from 'react';
import Gym from './Gym';

test('renders without crashing', async() => {
  const{baseElement} = await render(<Gym handleChange={act(()=>{return})} next={act(()=>{return})} prev={act(()=>{return})}/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Gym handleChange={act(()=>{return})} next={act(()=>{return})} prev={act(()=>{return})} />);
  expect (baseElement).toHaveTextContent("Please select your gym*");
});
