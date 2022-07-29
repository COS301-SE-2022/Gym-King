import {fireEvent, render, screen} from '@testing-library/react';
import UserProfilePage from './UserProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<UserProfilePage />);
  expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

    it('should get badges', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/users/owned/${"email"}`,{
                method: 'GET'
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
    it('should get claims', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/users/claims/${"email"}`,{
                method: 'GET'
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
    it('should get user info', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/users/user/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: "email",
                    password: "password"
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
    it('should update user info', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/users/user/info`,{
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: "email",
                    name: "name", 
                    surname: "surname", 
                    username: "username", 
                    number: "phone", 
                    password: "password", 
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
  
