jest.setTimeout(25000)
import { render } from '@testing-library/react';
import GymPage from './GymPage';

//render test withou crahing
test('renders without crashing', async() => {
    const { baseElement } = await render(<GymPage />);
    expect(baseElement).toBeDefined();
});
