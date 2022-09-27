import { render} from '@testing-library/react';
import EmployeeList from './EmployeeList';


test('renders without crashing', () => {
  const {baseElement} = render(<EmployeeList list={[]} history=""/>);
  expect(baseElement).toBeDefined();
});