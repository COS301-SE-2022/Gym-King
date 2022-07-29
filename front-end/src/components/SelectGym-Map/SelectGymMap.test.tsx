import { render } from '@testing-library/react';
import {SelectGymMap} from './SelectGymMap'

////TESTS TO BE PERFORMED////
/*

*/

test('renders without crashing', () => {
    const { baseElement } = render(<SelectGymMap />);
    expect(baseElement).toBeDefined();
  });
