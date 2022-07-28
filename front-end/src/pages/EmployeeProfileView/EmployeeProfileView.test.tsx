import {fireEvent, render, screen} from '@testing-library/react';
import EmployeeProfileView from './EmployeeProfileView';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement } = render(<EmployeeProfileView/>);
  expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {

    it('should load employee data', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/gyms/gym/${"gym_id"}`, {
            "method":"GET"
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
    it('should delete employee', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/employees/employee`, {
                method: 'DELETE',
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
                console.log(response)
                expect(response).toBeDefined()  

            })
            .catch(err => {
                console.log(err)
                expect(err).toBeDefined()  

            })
    });
  
  })
})
  

