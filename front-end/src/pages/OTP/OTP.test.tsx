import {render} from '@testing-library/react';
import OTP from './OTP';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const { baseElement } = render(<OTP/>);
  expect(baseElement).toBeDefined();
});