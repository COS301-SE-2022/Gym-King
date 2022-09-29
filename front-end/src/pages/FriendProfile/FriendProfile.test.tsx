jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendProfile from './FriendProfile';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendProfile />);
    expect(baseElement).toBeDefined();
  });
