import { render } from '@testing-library/react';
import ApprovalButton from './ApprovalButton';

test('renders without crashing', () => {
    const { baseElement } = render(<ApprovalButton userID={0} username="" badgeId=""  />);
    expect(baseElement).toBeDefined();
  });

