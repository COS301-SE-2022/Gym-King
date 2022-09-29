jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendRequests from './FriendRequests';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendRequests />);
    expect(baseElement).toBeDefined();
  });
