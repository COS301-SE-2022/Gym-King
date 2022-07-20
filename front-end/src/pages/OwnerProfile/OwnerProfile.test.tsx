import {fireEvent, render, screen} from '@testing-library/react';
import OwnerProfile from './OwnerProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<OwnerProfile />);
  exper(baseElement).toBeDefined();
});
