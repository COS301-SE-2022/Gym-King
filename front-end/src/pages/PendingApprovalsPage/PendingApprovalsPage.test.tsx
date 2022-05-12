import { render } from '@testing-library/react';
import PendingApprovalsPage from './PendingApprovalsPage'

test('renders without crashing', () => {
    const { baseElement } = render(<PendingApprovalsPage />);
    expect(baseElement).toBeDefined();
});