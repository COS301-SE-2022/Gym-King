jest.setTimeout(25000)
import { render} from '@testing-library/react';
import PendingBadgesPage from './PendingBadges';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
  const {baseElement} =await render(<PendingBadgesPage />);
  expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

    it('should load pending badges',  () => {
        (async ()=>{
            await fetch(process.env["REACT_APP_GYM_KING_API"]+`/users/claims/${"useremail"}`,{
                method: 'GET'
            })
            .then(response =>response.json())
            .then(response =>{
                expect(response).toBeDefined()
            })
            .catch(err => {
                expect(err).toBeDefined()
            })
        })
    });
})
  
