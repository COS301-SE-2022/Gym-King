jest.setTimeout(25000)
import {render} from '@testing-library/react';
import AddGymLocation from './AddGymLocation';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', async() => {
  const { baseElement } = await render(<AddGymLocation/>);
  expect(baseElement).toBeDefined();
});

