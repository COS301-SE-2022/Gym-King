jest.setTimeout(25000)
import { render } from '@testing-library/react';
import Toolbar from './Toolbar'

////TESTS TO BE PERFROMED////
/*
- test profile image is displayed correctly ?
*/

test('renders without crashing',async () => {
    const { baseElement } =await  render(<Toolbar username='user' menu={false}/>);
    expect(baseElement).toBeDefined();
  });

describe('Testing prop values', () => {

  test('correctly displays prop value ', async () => {
    const {baseElement} = await render(<Toolbar username='user1' menu={false}/>);
    expect (baseElement).toHaveTextContent("user1");    
  }); 

});