jest.setTimeout(25000)
import { render} from '@testing-library/react';
import GymOwnerPage from './GymOwnerPage';

//tests to see if the GymOwner Page renders without crashing
test('renders without crashing', async() => {
  const {baseElement} =await render(<GymOwnerPage />);
  expect(baseElement).toBeDefined();
});
