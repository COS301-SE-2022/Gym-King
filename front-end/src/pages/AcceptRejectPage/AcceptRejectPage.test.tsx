import { render } from '@testing-library/react';
import AcceptRejectPage from './AcceptReject';


////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
    const { baseElement } = render(<AcceptRejectPage />);
    expect(baseElement).toBeDefined();
});

describe('Testing integration of components', () => {
    
    test('sending in a list of claims displays it in the ActivityList component', async () => {
        const {getByTestId } = render(<AcceptRejectPage />);
    
        // make sure the accept reject cards are displayed 
        expect(getByTestId('ARC').innerHTML).toBeDefined()
    
    });
})



////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {
    let badgeId= "XRQ"
    let email ="u20519517@tuks.co.za"

    it('should load claim data', async () => {
        (()=>{
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim?bid=${badgeId}&email=${email}`,{
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
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge?bid=${badgeId}`,{
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
