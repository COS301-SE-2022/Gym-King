import { render } from '@testing-library/react';
import AddGym from './AddGym'

test('renders without crashing', () => {
    const { baseElement } = render(<AddGym />);
    expect(baseElement).toBeDefined();
});