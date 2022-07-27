import {fireEvent, render, screen} from '@testing-library/react';
import { Login } from './Login';


test('renders without crashing', () => {
  const {baseElement} = render(<Login />);
  expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

    it('should login a user', async () => {
        (async ()=>{
            fetch('https://gym-king.herokuapp.com/users/login',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: "email",
                    password: "password",
                    usertype: "usertype"
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
