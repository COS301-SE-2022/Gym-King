import { render} from '@testing-library/react';
import ResetPassword from './ResetPassword';
import axios from "axios";
import React from 'react';

test('renders without crashing', async() => {
  const {baseElement} =await render(<ResetPassword />);
  expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
  const {baseElement} = await render(<ResetPassword />);
  expect(baseElement).toHaveTextContent("New Password");
  expect(baseElement).toHaveTextContent("Confirm New Password");
});


//////INTEGRATION TESTS //////////

describe('Testing connection to API', () => {

  it('should reset a User Password',  () => {
     (async () => {
        await axios(process.env["REACT_APP_GYM_KING_API"]+'/users/user/password', {
           method: 'PUT',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
           },
           data:{
                email: sessionStorage.getItem("enteredEmail"),
                otp: sessionStorage.getItem("enteredOTP"),
                newpassword: sessionStorage.getItem("enteredPassword"),
           } 
        })
        .then(response =>response.data)
        .then(response => {
            expect(response).toBeDefined()
        })
        .catch(err => {
            expect(err).toBeDefined()
        })
     })
  });
})
