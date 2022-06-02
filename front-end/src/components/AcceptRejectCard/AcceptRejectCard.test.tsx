import { render } from '@testing-library/react';
import AcceptRejectCard from './AcceptRejectCard'

test('renders without crashing', () => {
    const { baseElement } = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="" i1="" i2="" i3="" activitytype="" />);
    expect(baseElement).toBeDefined();
  });
