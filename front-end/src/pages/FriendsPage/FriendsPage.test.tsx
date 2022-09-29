jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendsPage from './FriendsPage';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendsPage />);
    expect(baseElement).toBeDefined();
  });
