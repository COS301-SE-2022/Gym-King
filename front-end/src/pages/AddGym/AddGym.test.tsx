import {render,screen} from '@testing-library/react';
import AddGym from './AddGym';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', () => {
  const { baseElement } = render(<AddGym/>);
  expect(baseElement).toBeDefined();
  const linkElement = screen.getByText(/Add Gym/i);
  expect(linkElement).toBeInTheDocument();
});
