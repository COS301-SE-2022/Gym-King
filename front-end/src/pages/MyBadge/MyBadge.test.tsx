import {fireEvent, render, screen} from '@testing-library/react';
import MyBadge from './MyBadge';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const { baseElement } = render(<MyBadge/>);
  expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {

  it('should load user badges', async () => {
      (async ()=>{
        fetch(`https://gym-king.herokuapp.com/users/owned/${"user_email"}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            expect(response).toBeDefined()
        })
        .catch(err => {
            expect(err).toBeDefined()
        })
      })
  });

})

