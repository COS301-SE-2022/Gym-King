jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendProfile from './FriendProfile';

//Tests to see if the FriendProfile page renders without crashing
test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendProfile />);
    expect(baseElement).toBeDefined();
  });
