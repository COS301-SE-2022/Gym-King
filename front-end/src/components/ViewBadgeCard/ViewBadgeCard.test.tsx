import { render } from '@testing-library/react';
import ViewBadgeCard from './ViewBadgeCard';

test('renders without crashing', () => {
    const { baseElement } = render(<ViewBadgeCard BadgeEmblem='' BadgeID='' BadgeImg={0} BadgeRank="" BadgeTitle={""} BadgeDesc="" />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


