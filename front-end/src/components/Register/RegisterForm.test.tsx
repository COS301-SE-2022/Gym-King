import { render} from '@testing-library/react';
import RegisterForm from './RegisterForm';

test('renders without crashing', () => {
  const {baseElement} = render(<RegisterForm history={undefined}/>);
  expect(baseElement).toBeDefined();
});
