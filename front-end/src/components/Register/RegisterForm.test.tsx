import { render} from '@testing-library/react';
import React from 'react';
import RegisterForm from './RegisterForm';

test('renders without crashing', async () => {
  const {baseElement} =await render(<RegisterForm history={undefined}/>);
  expect(baseElement).toBeDefined();
});
