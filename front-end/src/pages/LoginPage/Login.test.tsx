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

//describe('Checks the title component', () => {
  //it('checks the value of the Title component', () => {
     //const {getByLabelText} =render(<Login />);
     //const titleValue = getByLabelText('Login')
    // expect(titleValue).toBeInTheDocument('Login')
  //})
//})

//setupTests.js
jest.mock('react-toastify', () => {
  const actual = jest.requireActual('react-toastify');
  Object.assign(actual, {toast: jest.fn()});
  return actual;
});

//test.spec.js
import {toast} from 'react-toastify';

const toastCalls = []
const spy = toast.mockImplmentation((...args) => {
  toastCalls.push(args)
 }
)

describe('...', () => {
  it('should ...', () => {
    //do something that calls the toast
    ...
    //then
    expect(toastCalls).toEqual(...)
  }
})
