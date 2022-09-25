import {fireEvent, render, screen} from '@testing-library/react';
import Password from './Password';

test('renders without crashing', ()=> {
  const{baseElement} = render(<Password/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const{baseElement} = render(<Password/>);
  expect(baseElement).toHaveTextContent("Password*");
});
