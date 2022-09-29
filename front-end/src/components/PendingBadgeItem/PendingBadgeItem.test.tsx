jest.setTimeout(250000)
import { render } from '@testing-library/react';
import PendingBadgeItem from './PendingBadgeItem';

test('renders without crashing', async() => {
    const { baseElement } =await render(<PendingBadgeItem badgeName='' badgeIcon=''/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


