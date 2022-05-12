import { render } from '@testing-library/react';
import {SelectGymMap} from './SelectGymMap'

test('renders without crashing', () => {
    const { baseElement } = render(<SelectGymMap />);
    expect(baseElement).toBeDefined();
  });
