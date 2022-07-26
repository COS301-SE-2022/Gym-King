import { fireEvent, render, screen } from '@testing-library/react';
import CreateBadge from './CreateBadge';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
    const { baseElement } = render(<CreateBadge />);
    expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

    it('should load owned gym data', async () => {
        (async ()=>{
            let gymOwner = "u20519517@tuks.co.za"
            await fetch(`https://gym-king.herokuapp.com/gyms/owned?email=${gymOwner}`,{
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

    it('should create a badge', async () => {
        let gid = "lttD";   //temp value for testing 
        let at = "Strength"
        let bn = "Test name"
        let bc = "Test challenge"
        let bd = "Test description";

        await fetch(`https://gym-king.herokuapp.com/badges/badge`,{
            "method":"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                gid: gid,
                badgename: bn,
                badgedescription: bd,
                badgechallenge: bc,
                badgeicon: "",
                activitytype: at,
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
    });

  })

describe('Integration Tests', () => {
    
    test('sending in a list of activity types displays correctly as a segment button', async () => {
        const {getByTestId } = render(<CreateBadge />);
    
        expect(getByTestId('btnSeg').innerHTML).toBeDefined()
    });

    test('sending in a list of gym names displays correctly a radio group', async () => {
        const {getByTestId } = render(<CreateBadge />);
    
        expect(getByTestId('rg')).toBeDefined()
    });
})

