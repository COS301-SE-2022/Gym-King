import {fireEvent, render, screen} from '@testing-library/react';
import SplashPage from './SplashPage';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<SplashPage />);
  expect(baseElement).toBeDefined();
});
