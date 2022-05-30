import { render } from '@testing-library/react';
import UploadActivity from './UploadActivity'

test('renders without crashing', () => {
    const { baseElement } = render(<UploadActivity />);
    expect(baseElement).toBeDefined();
  });


  //when the image can't be loaded, a defauly image must be displayed 