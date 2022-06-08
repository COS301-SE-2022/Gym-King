import { render } from '@testing-library/react';
import FileChooser from './FileChooser'

test('renders without crashing', () => {
    const { baseElement } = render(<FileChooser numFiles={0} />);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFROMED////
/*
- Renders without crashing 
- tests that is sends the file back to the parent component
- tests that is encode the files to be sent in an API request 
*/