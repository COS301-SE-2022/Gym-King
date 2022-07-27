import {fireEvent, render, screen} from '@testing-library/react';
import OwnerProfilePage from './OwnerProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<OwnerProfilePage />);
  expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {

  it('should load owner info', async () => {
      (async ()=>{
        fetch(`https://gym-king.herokuapp.com/owners/owner/info`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password")
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
  it('should load owner owned gyms', async () => {
    (async ()=>{
      fetch(`https://gym-king.herokuapp.com/gyms/owned/${"email"}`,{
        method: 'GET'
      })
      .then(response =>response.json())
      .then(response =>{
          expect(response).toBeDefined()
      })
      .catch(err => {
          expect(err).toBeDefined()
      }) 
    });
  });
  it('should load owner owned gyms', async () => {
    (async ()=>{
      fetch(`https://gym-king.herokuapp.com/owners/employees/empl_email`,{
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

  it('should update owner info', async () => {
    (async ()=>{
      fetch(`https://gym-king.herokuapp.com/owners/owner/info`,{
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
              email: "email",
              name: 'name', 
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
  });

})
})
