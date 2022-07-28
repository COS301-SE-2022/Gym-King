import { render } from '@testing-library/react';
import PendingBadgeItem from './PendingBadgeItem';

test('renders without crashing', () => {
    const { baseElement } = render(<PendingBadgeItem badgeName=''/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


