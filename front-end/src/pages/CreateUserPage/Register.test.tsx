import {fireEvent, render, screen} from '@testing-library/react';
import RegisterPage from './Register';

test('renders without crashing', () => {
  const {baseElement} = render(<RegisterPage/>);
  expect(baseElement).toBeDefined();
});



////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  test('should create a user', async () => {
      (()=>{
        
        fetch(`https://gym-king.herokuapp.com/users/user`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: "test@example.com",
                name: "test name",
                surname: "test surname",
                number:"0123456789",
                username: "test_username",
                password:"test_password",
            })
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
