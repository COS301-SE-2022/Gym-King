import { render } from '@testing-library/react';
import MapView from './MapView'

test('renders without crashing', () => {
    const { baseElement } = render(<MapView />);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFROMED////
/*
- Renders without crashing 

*/