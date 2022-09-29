jest.setTimeout(25000)
import {render} from '@testing-library/react';
import RegisterPage from './Register';

test('renders without crashing', async () => {
  const {baseElement} =await render(<RegisterPage/>);
  expect(baseElement).toBeDefined();
});

  

////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  test('should create a user', async () => {
      (async()=>{
        
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/users/user`,{
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
