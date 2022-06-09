import { fireEvent, render, screen } from '@testing-library/react';
import CreateBadge from './CreateBadge';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
    const { baseElement } = render(<CreateBadge />);
    expect(baseElement).toBeDefined();
});

