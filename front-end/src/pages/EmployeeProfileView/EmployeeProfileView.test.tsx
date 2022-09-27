import { render} from '@testing-library/react';
import EmployeeProfileView from './EmployeeProfileView';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
  const {baseElement } = render(<EmployeeProfileView/>);
  expect(baseElement).toBeDefined();
});


////////// INTEGRATION TESTS //////////

describe('Testing connection to API', () => {

    it('should load employee data', async () => {
        (async ()=>{
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/${"gym_id"}`, {
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
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee`, {
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
  

