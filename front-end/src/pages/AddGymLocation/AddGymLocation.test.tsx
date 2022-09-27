import {render} from '@testing-library/react';
import AddGymLocation from './AddGymLocation';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', async() => {
  const { baseElement } = render(<AddGymLocation/>);
  expect(baseElement).toBeDefined();
});

