import { render } from '@testing-library/react';
import { MyBadgeCard } from './MyBadgeCard'

test('renders without crashing', () => {
    const { baseElement } = render(<MyBadgeCard id="" name="" qty={0} badgeEmblem="" badgeRank='' />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


