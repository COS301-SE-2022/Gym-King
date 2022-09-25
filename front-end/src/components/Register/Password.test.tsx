import {fireEvent, render, screen} from '@testing-library/react';
import Password from './Password';

test('renders without crashing', ()=> {
  const{baseElement} = render(<Password handleChange={undefined} next={undefined} prev={undefined}/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const{baseElement} = render(<Password handleChange={undefined} next={undefined} prev={undefined}/>);
  expect(baseElement).toHaveTextContent("Password*");
});
