import {render,screen} from '@testing-library/react';
import ManageGyms from './ManageGyms';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', () => {
  const { baseElement } = render(<ManageGyms/>);
  expect(baseElement).toBeDefined();
  const linkElement = screen.getByText(/My Gyms/i);
  expect(linkElement).toBeInTheDocument();
});

/*Intergration test */
describe('Integration Tests', () => {

  test('sending in a list of activity types displays correctly as a segment button', async () => {
      render(<ManageGyms />);
      expect(screen.getByTestId('GymCard').innerHTML).toBeDefined()
  });
})