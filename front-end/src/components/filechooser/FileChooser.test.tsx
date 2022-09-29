jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FileChooser from './FileChooser'

test('renders without crashing', async() => {
    const { baseElement } = await render(<FileChooser numFiles={1} />);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFROMED////
/*
- tests that is sends the file back to the parent component
- tests that is encode the files to be sent in an API request 
*/
