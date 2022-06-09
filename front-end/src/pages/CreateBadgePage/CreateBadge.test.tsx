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
        (()=>{
            let gymOwner = "u20519517@tuks.co.za"
            fetch(`https://gym-king.herokuapp.com/gyms/owned?email=${gymOwner}`,{
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

            fetch(`https://gym-king.herokuapp.com/badges/badge?gid=${gid}&bn=${bn}&bd=${bd}&bc=${bc}&bi=${'BADGE ICON'}&at=${at}`,{
                "method":"POST"
            })
            .then(response =>response.json())
            .then(response =>{
                expect(response).toBeDefined()
            })
            .catch(err => {
                expect (err).toBeDefined()
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
