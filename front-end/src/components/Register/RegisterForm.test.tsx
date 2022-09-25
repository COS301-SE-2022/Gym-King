import {fireEvent, render, screen} from '@testing-library/react';
import RegisterForm from './RegisterForm';

test('renders without crashing', () => {
  const {baseElement} = render(<RegisterForm history={undefined}/>);
  expect(baseElement).toBeDefined();
});
