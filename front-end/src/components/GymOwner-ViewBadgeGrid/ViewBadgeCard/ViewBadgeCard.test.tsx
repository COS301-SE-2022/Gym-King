import { render } from '@testing-library/react';
import ViewBadgeCard from './ViewBadgeCard';
////TESTS TO BE PERFORMED////
/*
*/


test('renders without crashing', () => {
    const { baseElement } = render(<ViewBadgeCard BadgeTitle="" BadgeDesc="" BadgeID="" Badgerank="" BadgeEmblem="" />);
    expect(baseElement).toBeDefined();
  });
