import { render } from '@testing-library/react';
import GymOwnerViewBadgeGrid from './GymOwnerViewBadgeGrid';
////TESTS TO BE PERFORMED////
/*
*/


test('renders without crashing', () => {
    const { baseElement } = render(<GymOwnerViewBadgeGrid gymID=""/>);
    expect(baseElement).toBeDefined();
  });

