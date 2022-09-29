jest.setTimeout(25000)
import { render} from '@testing-library/react';
import GymOwnerPage from './GymOwnerPage';


test('renders without crashing', async() => {
  const {baseElement} =await render(<GymOwnerPage />);
  expect(baseElement).toBeDefined();
});
