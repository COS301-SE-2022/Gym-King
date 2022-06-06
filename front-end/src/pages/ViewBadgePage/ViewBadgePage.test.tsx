import { render } from '@testing-library/react';
import ViewBadgePage from './ViewBadgePage'

test('renders without crashing', () => {
    const { baseElement } = render(<ViewBadgePage/>);
    expect(baseElement).toBeDefined();
});