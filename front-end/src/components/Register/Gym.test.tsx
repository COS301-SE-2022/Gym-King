import { render} from '@testing-library/react';
import Gym from './Gym';

test('renders without crashing', () => {
  const{baseElement} = render(<Gym handleChange={undefined} next={undefined} prev={undefined}/>);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Gym handleChange={undefined} next={undefined} prev={undefined} />);
  expect (baseElement).toHaveTextContent("Please select your gym*");
});
