import {fireEvent, render, screen} from '@testing-library/react';
import EmployeeProfilePage from './EmployeeProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement } = render(<EmployeeProfile/>);
  expect(baseElement).toBeDefined();
});
