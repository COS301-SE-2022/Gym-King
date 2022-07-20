import {fireEvent, render, screen} from '@testing-library/react';
import AddEmployee from './AddEmployee';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', ()=> {
  const{baseElement} = render(<AddEmployee/>);
  expect(baseElement).toBeDefined();
});
