jest.setTimeout(250000)
import { render } from '@testing-library/react';
import ViewBadgeCard from './ViewBadgeCard';
////TESTS TO BE PERFORMED////
/*
*/


test('renders without crashing', async() => {
    const { baseElement } =await render(<ViewBadgeCard BadgeTitle="" BadgeDesc="" BadgeID="" Badgerank="" BadgeEmblem="" />);
    expect(baseElement).toBeDefined();
  });
