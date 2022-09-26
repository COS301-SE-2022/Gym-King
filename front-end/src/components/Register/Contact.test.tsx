import { fireEvent, render, screen} from '@testing-library/react';
import Contact from './Contact';

test('renders without crashing', () => {
  const {baseElement} = render(<Contact handleChange="" next="" prev=""/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Contact handleChange="" next="" prev=""/>);
  expect(baseElement).toHaveTextContent("Email*");
  expect(baseElement).toHaveTextContent("Phone Number*");
});

////INTEGRATION TESTS ////////
