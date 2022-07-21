import {fireEvent, render, screen} from '@testing-library/react';
import OwnerProfilePage from './OwnerProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<OwnerProfilePage />);
  expect(baseElement).toBeDefined();
});
