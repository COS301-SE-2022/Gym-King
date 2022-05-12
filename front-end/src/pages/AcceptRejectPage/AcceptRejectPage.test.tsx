import { render } from '@testing-library/react';
import AcceptRejectPage from './AcceptReject'

test('renders without crashing', () => {
    const { baseElement } = render(<AcceptRejectPage />);
    expect(baseElement).toBeDefined();
});