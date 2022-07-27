import {render,screen} from '@testing-library/react';
import EditGym from './EditGym';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', () => {
  const { baseElement } = render(<EditGym/>);
  expect(baseElement).toBeDefined();
  const linkElement = screen.getByText(/Edit Gym/i);
  expect(linkElement).toBeInTheDocument();
});
