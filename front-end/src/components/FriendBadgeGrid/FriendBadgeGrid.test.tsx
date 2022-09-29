jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendBadgeGrid from './FriendBadgeGrid';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendBadgeGrid badges={[]}/>);
    expect(baseElement).toBeDefined();
  });
