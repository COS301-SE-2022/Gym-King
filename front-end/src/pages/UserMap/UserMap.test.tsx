jest.setTimeout(25000)
import { render } from '@testing-library/react';
import UserMap from './UserMap'

test('renders without crashing', async() => {
    const { baseElement } = await render(<UserMap />);
    expect(baseElement).toBeDefined();
});

