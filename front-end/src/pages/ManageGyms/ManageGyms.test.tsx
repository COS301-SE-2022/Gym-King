import {fireEvent, render, screen} from '@testing-library/react';
import ManageGyms from './ManageGyms';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const { baseElement } = render(<ManageGyms/>);
  expect(baseElement).toBeDefined();
});
