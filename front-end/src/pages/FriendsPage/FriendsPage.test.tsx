jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendsPage from './FriendsPage';

//tests to see if the page renders without crashing
test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendsPage />);
    expect(baseElement).toBeDefined();
  });
