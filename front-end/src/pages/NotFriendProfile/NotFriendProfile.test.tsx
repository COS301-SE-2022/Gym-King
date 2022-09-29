jest.setTimeout(250000)
import { render } from '@testing-library/react';
import NotFriendProfile from './NotFriendProfile';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<NotFriendProfile />);
    expect(baseElement).toBeDefined();
  });
