import { render} from '@testing-library/react';
import React from 'react';
import RegisterForm from './RegisterForm';

test('renders without crashing', async () => {
  const {baseElement} = render(<RegisterForm history={undefined}/>);
  expect(baseElement).toBeDefined();
});
