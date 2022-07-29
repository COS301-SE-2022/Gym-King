import {fireEvent, render, screen} from '@testing-library/react';
import AddEmployee from './AddEmployee';


test('renders without crashing', ()=> {
  const{baseElement} = render(<AddEmployee/>);
  expect(baseElement).toBeDefined();
});

test('correctly diplays labels ', async () => {
  const {baseElement} = render(<AddEmployee/>);
  expect (baseElement).toHaveTextContent("Email*");
  expect (baseElement).toHaveTextContent("Name*");
  expect (baseElement).toHaveTextContent("Surname*");
  expect (baseElement).toHaveTextContent("Phone Number");
  expect (baseElement).toHaveTextContent("Username");
  expect (baseElement).toHaveTextContent("Password");
  expect (baseElement).toHaveTextContent("Gym");
});



//////// INTEGRATION TESTS ///////////

describe('Testing connection to api', () => {
  let badgeId= "XRQ"
  let email ="u20519517@tuks.co.za"

  it('should load claim data', async () => {
      (()=>{
        fetch(`https://gym-king.herokuapp.com/gyms/owned/${email}`,{
          "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            expect(response).toBeDefined()
        })
        .catch(err => {
          console.log(err)
          expect(err).toBeDefined()
        }) 
        })
  });

  it('should load claim data', async () => {
      (()=>
      {
        fetch(`https://gym-king.herokuapp.com/employees/employee`,{
            "method":"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: "",
                name: "",
                surname: "",
                number: "", 
                username: "", 
                password: "",
                gid: ""
            })
        })
        .then(response =>response.json())
        .then(response =>{
          expect(response).toBeDefined()
        })
        .catch(err => {
            console.log(err)
            expect(err).toBeDefined()
      }) 
      })
  });
})

