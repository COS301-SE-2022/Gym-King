jest.setTimeout(250000)
import { render} from '@testing-library/react';
import EmployeeList from './EmployeeList';


test('renders without crashing',async () => {
  const {baseElement} = await render(<EmployeeList list={[]} history={undefined}/>);
  expect(baseElement).toBeDefined();
});