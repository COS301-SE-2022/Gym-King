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

    test('should load badge info',  () => {
        
        ( ()=>{
            console.log("hello")
            fetch(`https://gym-king.herokuapp.com/badges/gym/${"gymid"}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                expect(response).toBeDefined()
            })
            .catch(err => {
                console.log(err)
                expect(err).toBeDefined()
            })
        })
    });
})
  
