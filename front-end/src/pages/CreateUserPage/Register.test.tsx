import {fireEvent, render, screen} from '@testing-library/react';
import CreateUserPage from './CreateUserPage';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<Register />);
  expect(baseElement).toBeDefined();
});
