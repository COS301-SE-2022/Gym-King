import { render} from '@testing-library/react';
import EmployeeList from './EmployeeList';
import { useHistory } from 'react-router-dom';


test('renders without crashing',async () => {
  let history=useHistory()
  const {baseElement} = await render(<EmployeeList list={[]} history={history}/>);
  expect(baseElement).toBeDefined();
});