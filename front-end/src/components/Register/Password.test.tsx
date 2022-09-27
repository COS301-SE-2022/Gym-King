import { render} from '@testing-library/react';
import React from 'react';
import Password from './Password';

test('renders without crashing', async()=> {
  const{baseElement} = render(<Password handleChange={undefined} next={undefined} prev={undefined}/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const{baseElement} = render(<Password handleChange={undefined} next={undefined} prev={undefined}/>);
  expect(baseElement).toHaveTextContent("Password*");
});
