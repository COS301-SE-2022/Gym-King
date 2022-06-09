import { render } from '@testing-library/react';
import { useEffect } from 'react';
import AcceptRejectPage from './AcceptReject'
const request = require('supertest');


////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
    const { baseElement } = render(<AcceptRejectPage />);
    expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {
    let badgeId= "XRQ"
    let email ="u20519517@tuks.co.za"

    it('should load claim data', async () => {
        (()=>{
            fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${badgeId}&email=${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                expect (response).toBeDefined();
            })
            .catch(err => {
                expect (err).toBeDefined();
            })
        })
    });

    it('should load claim data', async () => {
        (()=>
        {
            fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
            "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                expect (response).toBeDefined();
            })
            .catch(err => {
                expect (err).toBeDefined();
            })
        })
    });
  })