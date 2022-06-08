import { render } from '@testing-library/react';
import GymOwnerViewBadge from './GymOwnerViewBadge'

test('renders without crashing', () => {
    const { baseElement } = render(<GymOwnerViewBadge />);
    expect(baseElement).toBeDefined();
});