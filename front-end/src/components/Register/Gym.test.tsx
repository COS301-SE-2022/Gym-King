import {fireEvent, render, screen} from '@testing-library/react';
import Gym from './Gym';

test('renders without crashing', () => {
  const{baseElement} = render(<Gym/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Gym />);
  expect (baseElement).toHaveTextContent("Please select your gym*");
});
