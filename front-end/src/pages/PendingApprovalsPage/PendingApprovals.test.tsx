import { render } from '@testing-library/react';
import PendingApprovals from './PendingApprovals'

test('renders without crashing', () => {
    const { baseElement } = render(<PendingApprovals />);
    expect(baseElement).toBeDefined();
});