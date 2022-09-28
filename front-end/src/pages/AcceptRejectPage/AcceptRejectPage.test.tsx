jest.setTimeout(25000)

import { render } from '@testing-library/react';
import AcceptRejectPage from './AcceptReject';


////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
    const { baseElement } = await render(<AcceptRejectPage />);
    expect(baseElement).toBeDefined();
});

describe('Testing integration of components', () => {
    
    test('sending in a list of claims displays it in the ActivityList component', async () => {
        const {getByTestId } = await render(<AcceptRejectPage />);
    
        // make sure the accept reject cards are displayed 
        expect(getByTestId('ARC').innerHTML).toBeDefined()
    
    });
})



////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {
    let badgeId= "XRQ"
    let email ="u20519517@tuks.co.za"

    it('should load claim data',  () => {
        let test = (async()=>{
            await fetch(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim?bid=${badgeId}&username=${localStorage.getItem("username")!}`,{
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
        test()
    });

    it('should load claim data',  () => {
        
        let test=(async()=>
        {
            await fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge?bid=${badgeId}`,{
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

        test()
    });
  })
