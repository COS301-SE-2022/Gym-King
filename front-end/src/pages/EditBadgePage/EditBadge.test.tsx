import {fireEvent, render, screen} from '@testing-library/react';
import EditBadge from './EditBadgePage';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<EditBadge />);
  expect(baseElement).toBeDefined();
});
