import { render } from '@testing-library/react';
import AddGymLocation from './AddGymLocation'

test('renders without crashing', () => {
    const { baseElement } = render(<AddGymLocation />);
    expect(baseElement).toBeDefined();
});