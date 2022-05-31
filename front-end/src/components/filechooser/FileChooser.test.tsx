import { render } from '@testing-library/react';
import FileChooser from './FileChooser'

test('renders without crashing', () => {
    const { baseElement } = render(<FileChooser numFiles={0} />);
    expect(baseElement).toBeDefined();
  });