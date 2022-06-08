import { render } from '@testing-library/react';
import ApprovalButton from './approvalButton'

test('renders without crashing', () => {
    const { baseElement } = render(<ApprovalButton userID={0} username="" badgeId=""  />);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFROMED////
/*
  - Renders without crashing 
  - tests that onClick button redirects to accept reject page 
  - test that local storage values are set (email, badgeid and username)
  - test that username label displays what is sent in as props 
  - test that image displays correcty ?
*/