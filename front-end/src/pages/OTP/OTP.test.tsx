jest.setTimeout(25000)
import {render} from '@testing-library/react';
import OTP from './OTP';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing',async () => {
  const { baseElement } =await render(<OTP/>);
  expect(baseElement).toBeDefined();
});