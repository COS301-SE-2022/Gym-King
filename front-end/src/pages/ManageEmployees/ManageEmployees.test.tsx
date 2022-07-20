import {fireEvent, render, screen} from '@testing-library/react';
import ManageEmployees from '/ManageEmployees';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', ()=> {
  const {baseElement} = render(<ManageEmployees />);
  expect(baseElement).toBeDefined();
});
