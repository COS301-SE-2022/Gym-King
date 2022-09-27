import { render} from '@testing-library/react';
import React from 'react';
import Contact from './Contact';

test('renders without crashing', async() => {
  const {baseElement} = render(<Contact handleChange={undefined} next={undefined} prev={undefined} />);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Contact handleChange={undefined} next={undefined} prev={undefined}/>);
  expect(baseElement).toHaveTextContent("Email*");
  expect(baseElement).toHaveTextContent("Phone Number*");
});

////INTEGRATION TESTS ////////
