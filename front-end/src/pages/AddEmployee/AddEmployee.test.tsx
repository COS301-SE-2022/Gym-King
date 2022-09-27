import { render} from '@testing-library/react';
import AddEmployee from './AddEmployee';


test('renders without crashing', async ()=> {
  const{baseElement} = render(<AddEmployee/>);
  expect(baseElement).toBeDefined();
});

test('correctly diplays labels ', async () => {
  const {baseElement} = render(<AddEmployee/>);
  expect (baseElement).toHaveTextContent("Email*");
  //expect (baseElement).toHaveTextContent("Full name*");
  expect (baseElement).toHaveTextContent("Phone Number");
  expect (baseElement).toHaveTextContent("Username");
  expect (baseElement).toHaveTextContent("Password");
  expect (baseElement).toHaveTextContent("Gym");
});



//////// INTEGRATION TESTS ///////////

describe('Testing connection to api', () => {
  let email ="u20519517@tuks.co.za"

  it('should load claim data', async () => {
      (async()=>{
        fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/${email}`,{
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
      (async()=>
      {
        fetch(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee`,{
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

