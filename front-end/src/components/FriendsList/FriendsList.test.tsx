jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendsList from './FriendsList';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendsList friendsList={[]}/>);
    expect(baseElement).toBeDefined();
  });
