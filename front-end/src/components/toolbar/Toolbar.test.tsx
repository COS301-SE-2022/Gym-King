import { render } from '@testing-library/react';
import Toolbar from './Toolbar'

////TESTS TO BE PERFROMED////
/*
- test profile image is displayed correctly ?
*/

test('renders without crashing',async () => {
    const { baseElement } = render(<Toolbar username='user'/>);
    expect(baseElement).toBeDefined();
  });

describe('Testing prop values', async() => {

  test('correctly displays prop value ', async () => {
    const {baseElement} = render(<Toolbar username='user1' />);
    expect (baseElement).toHaveTextContent("user1");    
  }); 

});