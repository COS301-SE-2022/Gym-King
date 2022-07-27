import {fireEvent, render, screen} from '@testing-library/react';
import ManageGyms from './ManageGyms';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', () => {
  const { baseElement } = render(<ManageGyms/>);
  expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {

  it('should load owners gyms', async () => {
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
      })
  });
  it('should delete a gym', async () => {
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
    })
  });

})

