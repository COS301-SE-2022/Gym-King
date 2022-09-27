import { render } from '@testing-library/react';
import AR from './AR';

test('renders without crashing', async() => {
    const { baseElement } = render(<AR rank = "b"emblem = "bicep" />);
    expect(baseElement).toBeDefined();
});

////TESTS TO BE PERFORMED////
/*
*/

