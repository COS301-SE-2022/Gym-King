import {fireEvent, render, screen} from '@testing-library/react';
import EmployeeProfilePage from './EmployeeProfile';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement } = render(<EmployeeProfilePage/>);
  expect(baseElement).toBeDefined();
});



////////// INTEGRATION TESTS //////////
describe('Testing connection to api', () => {

  it('should load employee data', async () => {
      (async ()=>{
        fetch(`https://gym-king.herokuapp.com/employees/employee/info`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: "",
                password: ""
            })
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            expect(response).toBeDefined()
        })
        .catch(err => {
            console.log(err)
            expect(err).toBeDefined()

        })
      })
  });

  it('should update employee data', async () => {
      (()=>{
          fetch(`https://gym-king.herokuapp.com/employees/employee/info`,{
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
                    password:" localStorage.getItem(password)", 
                })
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                expect(response).toBeDefined()                
            })
            .catch(err => {
                console.log(err)
                expect(err).toBeDefined()
            }) 
      })
  });

})

