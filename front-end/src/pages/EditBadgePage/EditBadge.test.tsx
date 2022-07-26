import { fireEvent, render, screen } from '@testing-library/react';
import EditBadge from './EditBadge';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
    const { baseElement } = render(<EditBadge />);
    expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

    it('should load badge data', async () => {
        
        ( ()=>{
            let badgeId="XRQ"
            fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                expect (response).toBeDefined()
            })
            .catch(err => {
                expect (err).toBeDefined()
                console.log(err)
            })
        } )
    });

    it('should update a badge', async () => {
        (()=>{
            let badgeId="XRQ"
            let gymid= 'lttD'
            let badgeicon = "BADGE ICON"
            let at = "CARDIO";
            let bn = "";
            let bc = "";
            let bd = "formData.badgeDescription";
            
            fetch(`https://gym-king.herokuapp.com/badges/badge`,{
                "method":"PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    bid: badgeId,
                    gid: gymid,
                    badgename: bn,
                    badgedescription: bd,
                    badgechallenge: bc,
                    badgeicon: badgeicon,
                    activitytype: at
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
        } )
    });

    it('should delete a badge', async () => {
        (()=>{
            fetch(`https://gym-king.herokuapp.com/badges/badge`,{
                "method":"DELETE",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    bid: ""
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
describe('Integration Tests', () => {
    
    test('sending in a list of activity types displays correctly as a segment button', async () => {
        const {getByTestId } = render(<EditBadge />);
    
        expect(getByTestId('segBtn').innerHTML).toBeDefined()
    });

})*/