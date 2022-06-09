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
        const updateBadge= ()=>{
            let badgeId="XRQ"
            let gymid= 'lttD'
            let badgeicon = "BADGE ICON"
            let at = "CARDIO";
            let bn = "";
            let bc = "";
            let bd = "formData.badgeDescription";
            
            fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}&gid=${gymid}&bn=${bn}&bd=${bd}&bc=${bc}&bi=${badgeicon}&at=${at}`,{
                "method":"PUT"
            })
            .then(response =>response.json())
            .then(response =>{
                expect (response).toBeDefined()
            })
            .catch(err => {
                expect (err).toBeDefined()
            }) 
        } 
    });

    it('should delete a badge', async () => {
        (()=>{
            let badgeId="XRQ"

            fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
                "method":"DELETE"
            })
            .then(response =>response.json())
            .then(response =>{
                expect (response).toBeDefined
            })
            .catch(err => {
                expect (err).toBeDefined()
            }) 
        })
    });

})

describe('Integration Tests', () => {
    
    test('sending in a list of activity types displays correctly as a segment button', async () => {
        const {getByTestId } = render(<EditBadge />);
    
        expect(getByTestId('btnSeg').innerHTML).toBeDefined()
    });
/*
    test('sending in a list of gym names displays correctly a radio group', async () => {
        const {getByTestId } = render(<EditBadge />);
    
        expect (getByTestId('rg').innerHTML).toBeDefined()
    }); */
})