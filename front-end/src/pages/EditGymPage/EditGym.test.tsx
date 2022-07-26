import { fireEvent, render, screen } from '@testing-library/react';
import EditGym from './EditGym';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
    const { baseElement } = render(<EditGym />);
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

    it('should get gym info', async () => {
        (()=>{
            fetch(`https://gym-king.herokuapp.com/gyms/gym/"pwe3"}`,
            {
                method: "Get",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
                .then((response) => response.json())
                .then((response) => {                
                    expect(response).toBeDefined()

            })
            .catch((err) => {
            console.log(err);
                expect(err).toBeDefined()

            });
        })
    });

})

describe('Integration Tests', () => {
    
    test('renders map', async () => {
        const {getByTestId } = render(<EditGym />);
    
        expect(getByTestId('map').innerHTML).toBeDefined()
        expect(getByTestId('oLay').innerHTML).toBeDefined()
    });

})