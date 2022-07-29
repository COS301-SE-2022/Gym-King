import {fireEvent, render, screen} from '@testing-library/react';
import EmployeeList from './EmployeeList';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<EmployeeList list={[]} history=""/>);
  expect(baseElement).toBeDefined();
});