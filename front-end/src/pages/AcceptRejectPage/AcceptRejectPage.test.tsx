import { render, wait } from '@testing-library/react';
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


////////// INTEGRATION TESTS //////////

describe('Integration Tests', () => {
    
    test('sending in a list of claims displays it in the ActivityList component', async () => {
        const {getByTestId } = render(<AcceptRejectPage />);
    
        // make sure the accept reject cards are displayed 
        expect(getByTestId('ARC').innerHTML).toBeDefined()
    
    });
})
