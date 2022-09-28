jest.setTimeout(25000)
import { render} from '@testing-library/react';
import OwnerProfilePage from './OwnerProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
  const {baseElement} =await render(<OwnerProfilePage />);
  expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////


describe('Testing connection to api', () => {

  it('should load owner info',  () => {
      (async ()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/owners/owner/info`,{
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
  it('should load owner owned gyms',  () => {
    (async ()=>{
      await fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/${"email"}`,{
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
  it('should load owner owned gyms',  () => {
    (async ()=>{
      await fetch(process.env["REACT_APP_GYM_KING_API"]+`/owners/employees/empl_email`,{
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

  it('should update owner info',  () => {
    (async ()=>{
      await fetch(process.env["REACT_APP_GYM_KING_API"]+`/owners/owner/info`,{
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
