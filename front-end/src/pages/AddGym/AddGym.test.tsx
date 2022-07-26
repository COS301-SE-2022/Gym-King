import { render, wait } from '@testing-library/react';
import AddGym from './AddGym';
//import AcceptRejectPage from './AcceptReject'
const request = require('supertest');


test('renders without crashing', () => {
    const { baseElement } = render(<AddGym />);
    expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {

    it('should load claim data', async () => {
        (()=>{
            fetch(`https://gym-king.herokuapp.com/gyms/gym`,
            {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                gymBrandName: "gymName",
                gymAddress: "gymAddress",
                gymCoordLong: "coordinate[1]",
                gymCoordLat: "coordinate[0]",
                gymIcon: "gymIcon"
            })
            })
            .then((response) => response.json())
            .then((response) => {
            
            })
            .catch((err) => {
            console.log(err);
            });
        })
    });

    it('should load claim data', async () => {
        (()=>
        {
            fetch(`https://gym-king.herokuapp.com/gyms/owned`,
            {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                email: "localStorage.getItem('email')",
                gid: "sessionStorage.getItem('new_gid')"
                })
            }
            )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            }); 
        })
    });
  })


////////// INTEGRATION TESTS //////////
/*
describe('Integration Tests', () => {
    
    test('rendering the map', async () => {
        const {getByTestId } = render(<AddGym />);
        // make sure the accept reject cards are displayed 
        expect(getByTestId('map').innerHTML).toBeDefined()
        expect(getByTestId('ov').innerHTML).toBeDefined()
    
    });
})*/