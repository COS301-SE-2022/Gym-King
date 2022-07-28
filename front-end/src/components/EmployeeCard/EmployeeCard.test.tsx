import { render } from '@testing-library/react';
import { EmployeeCard } from './EmployeeCard'

test('renders without crashing', () => {
    const { baseElement } = render(<EmployeeCard  />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


