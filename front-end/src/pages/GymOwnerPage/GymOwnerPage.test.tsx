import { render} from '@testing-library/react';
import GymOwnerPage from './GymOwnerPage';


test('renders without crashing', () => {
  const {baseElement} = render(<GymOwnerPage />);
  expect(baseElement).toBeDefined();
});
