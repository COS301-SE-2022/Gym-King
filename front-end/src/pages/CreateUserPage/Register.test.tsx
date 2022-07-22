import {fireEvent, render, screen} from '@testing-library/react';
import RegisterPage from './Register';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<RegisterPage/>);
  expect(baseElement).toBeDefined();
});
