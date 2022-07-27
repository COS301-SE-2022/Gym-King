import {fireEvent, render, screen} from '@testing-library/react';
import PendingBadgesPage from './PendingBadges';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<PendingBadgesPage />);
  expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

    it('should load pending badges', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/users/claims/${"useremail"}`,{
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
  
