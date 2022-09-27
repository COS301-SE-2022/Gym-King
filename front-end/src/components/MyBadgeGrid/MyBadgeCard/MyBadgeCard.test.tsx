import { render } from '@testing-library/react';
import { MyBadgeCard } from './MyBadgeCard'

test('renders without crashing',async() => {
    const { baseElement } =await render(<MyBadgeCard id={null} name="" qty={0} badgeEmblem="" badgeRank="" />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


