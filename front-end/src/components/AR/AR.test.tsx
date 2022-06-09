import { render } from '@testing-library/react';
import AR from './AR';

test('renders without crashing', () => {
    const { baseElement } = render(<AR />);
    expect(baseElement).toBeDefined();
});

////TESTS TO BE PERFORMED////
/*
*/

