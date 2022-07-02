import { render } from '@testing-library/react';
import MapView from './MapView'

////TESTS TO BE PERFORMED////
/*

*/

test('renders without crashing', () => {
    const { baseElement } = render(<MapView />);
    expect(baseElement).toBeDefined();
  });

