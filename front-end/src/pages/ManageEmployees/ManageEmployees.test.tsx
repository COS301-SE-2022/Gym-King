import {fireEvent, render, screen} from '@testing-library/react';
import ManageEmployees from './ManageEmployees';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', ()=> {
  const {baseElement} = render(<ManageEmployees />);
  expect(baseElement).toBeDefined();
});


////////// INTEGRATION TESTS //////////

describe('Testing API calls', () => {

  it('should load owners employees', async () => {
      (async ()=>{
        fetch(`https://gym-king.herokuapp.com/owners/employees/${"owner_email"}`, {
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
  it('should get owners gyms', async () => {
      (async ()=>{
        fetch(`https://gym-king.herokuapp.com/gyms/owned/${"owner_email"}`,{
          "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            expect(response).toBeDefined()
        })
        .catch(err => {
          expect(err).toBeDefined()
        })
  });

})
})

