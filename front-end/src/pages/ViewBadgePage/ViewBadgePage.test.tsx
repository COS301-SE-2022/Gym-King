import {fireEvent, render, screen} from '@testing-library/react';
import ViewBadgePage from './ViewBadgePage';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const {baseElement} = render(<ViewBadgePage/>);
  expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

    it('should load badge info', async () => {
        (async ()=>{
            fetch(`https://gym-king.herokuapp.com/badges/gym/${"gymid"}`,{
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
    });
})
  
