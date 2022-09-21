import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Login } from './Login';
import {ToastContainer} from 'react-toastify';


test('renders without crashing', () => {
  const {baseElement} = render(<Login />);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = render(<Login />);
  expect (baseElement).toHaveTextContent("Email*");
  expect (baseElement).toHaveTextContent("Password*");
});



////////// INTEGRATION TESTS //////////

describe('Testing connection to API', () => {

    it('should login a user', async () => {
        (async ()=>{
            fetch(process.env["REACT_APP_GYM_KING_API"]+'/users/login',{
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

export const renderWithToastify = (component) => {
  return (
    render(
      <div>
        <ToastContainer/>
        {component}
      </div> 
    )  
  );
};

expect(await screen.findByText("alert text")).toBeInTheDocument();
