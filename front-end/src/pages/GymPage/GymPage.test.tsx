import { render } from '@testing-library/react';
import GymPage from './GymPage';

//render test withou crahing
test('renders without crashing', async() => {
    const { baseElement } = render(<GymPage />);
    expect(baseElement).toBeDefined();
});
