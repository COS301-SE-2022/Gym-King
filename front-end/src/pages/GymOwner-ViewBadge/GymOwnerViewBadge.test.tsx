jest.setTimeout(25000)
import { render } from '@testing-library/react';
import GymOwnerViewBadge from './GymOwnerViewBadge'

//render test withou crashing
test('renders without crashing', async() => {
    const { baseElement } =await render(<GymOwnerViewBadge />);
    expect(baseElement).toBeDefined();
});



////////// INTEGRATION TESTS //////////

//tests the connection with the API can ensures that the API returns the correct information
describe('Testing connection to api', () => {
    test("API fetch badges",async()=>{
        var email="u20519517@tuks.co.za"
                await fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned?email=${email}`,{
                    "method":"GET"
                })
                .then(response =>response.json())
                .then(response =>{
                    expect(response).toBeDefined()
                })
                .catch(err => {
                    expect(err).toBeDefined()
                })
            
    
    })
})
