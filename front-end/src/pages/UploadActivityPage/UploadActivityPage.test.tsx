import { render } from '@testing-library/react';
import UploadActivityPage from './UploadActivityPage'

test('renders without crashing', () => {
    const { baseElement } = render(<UploadActivityPage />);
    expect(baseElement).toBeDefined();
  });


  //when the image can't be loaded, a defauly image must be displayed 