import { render } from '@testing-library/react';
import UserMap from './UserMap'

test('renders without crashing', () => {
    const { baseElement } = render(<UserMap />);
    expect(baseElement).toBeDefined();
  });

