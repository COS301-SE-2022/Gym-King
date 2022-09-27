import {  render } from '@testing-library/react';
import CreateBadge from './CreateBadge';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
    const { baseElement } = render(<CreateBadge />);
    expect(baseElement).toBeDefined();
});

test('correctly displays labels', async () => {
    const {baseElement} = render(<CreateBadge />);
    expect (baseElement).toHaveTextContent("Badge Name:");
    expect (baseElement).toHaveTextContent("Activity Type:");
    expect (baseElement).toHaveTextContent("Gym Location:");
    expect (baseElement).toHaveTextContent("Badge Challenge:");
    expect (baseElement).toHaveTextContent("Badge Description:");
    
});


////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

    it('should load owned gym data',  () => {
        (async ()=>{
            let gymOwner = "u20519517@tuks.co.za"
            await fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned?email=${gymOwner}`,{
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

    it('should create a badge',  () => {
        (async()=>{

        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge`,{
            "method":"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                gid: "gid",
                badgename: "bn",
                badgedescription: "bd",
                badgechallenge: "bc",
                badgeicon: "",
                activitytype: "at",
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
/*
describe('Testing integration of components and pages', () => {
    
    test('sending in a list of activity types displays correctly as a segment button', async () => {
        const {getByTestId } = render(<CreateBadge />);
    
        expect(getByTestId('btnSeg').innerHTML).toBeDefined()
    });

    test('sending in a list of gym names displays correctly a radio group', async () => {
        const {getByTestId } = render(<CreateBadge />);
    
        expect(getByTestId('rg')).toBeDefined()
    });
})
*/
