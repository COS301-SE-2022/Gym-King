import {fireEvent, render, screen} from '@testing-library/react';
import GymOwnerPage from './GymOwnerPage';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<GymOwnerPage />);
  expect(baseElement).toBeDefined();
});
