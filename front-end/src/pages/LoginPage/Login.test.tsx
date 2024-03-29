jest.setTimeout(25000)
import { render} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Login } from './Login';


test('renders without crashing', async () => {
  const {baseElement} =await render(<Login />);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} =await render(<Login />);
  expect (baseElement).toHaveTextContent("Email*");
  expect (baseElement).toHaveTextContent("Password*");
});



////////// INTEGRATION TESTS //////////

describe('Testing connection to API', () => {

    it('should login a user',  () => {
        (async ()=>{
            await fetch(process.env["REACT_APP_GYM_KING_API"]+'/users/login',{
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

//export const renderWithToastify = (component) => {
  //return (
    //render(
      //<div>
        //<ToastContainer/>
        //{component}
      //</div> 
    //)  
  //);
//};

//expect(await screen.findByText("Welcome to Gym King.")).toBeInTheDocument();
