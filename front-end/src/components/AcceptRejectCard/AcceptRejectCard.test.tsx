import { render } from '@testing-library/react';
import AcceptRejectCard from './AcceptRejectCard'

test('renders without crashing', () => {
    const { baseElement } = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="" i1="" i2="" i3="" activitytype="" />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*
  - Renders without crashing 
  - tests if text for username displays what is passed in as a prop
  - tests if text for activtity type displays what is passed in as a prop
  - tests if text for badgename displays what is passed in as a prop
  - test if the accept button works 
  - test if the reject button works 
  - test if badge image displays
  - test if proof displays 
*/