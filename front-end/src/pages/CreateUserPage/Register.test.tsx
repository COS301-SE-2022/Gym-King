import {fireEvent, render, screen} from '@testing-library/react';
import RegisterPage from './Register';

test('renders without crashing', () => {
  const {baseElement} = render(<RegisterPage/>);
  expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

  it('should create a user', async () => {
      (()=>{
        fetch(`https://gym-king.herokuapp.com/users/user`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: "",
                name: "",
                surname: "",
                number:"",
                username: "",
                password:"",
            })
            })
          .then(response =>response.json())
          .then(response =>{
              //show toast
              if(response.results.success){
              }else{
                console.log( response.results);
                expect(response).toBeDefined()
              }
          })
          .catch(err => { 
              console.log(err)
              expect(err).toBeDefined()

          }) 
      })
  });


})
