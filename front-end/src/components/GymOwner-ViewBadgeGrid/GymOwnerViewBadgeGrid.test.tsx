jest.setTimeout(250000)
import { render } from '@testing-library/react';
import GymOwnerViewBadgeGrid from './GymOwnerViewBadgeGrid';
////TESTS TO BE PERFORMED////
/*
*/


test('renders without crashing', async() => {
    const { baseElement } = await render(<GymOwnerViewBadgeGrid gymID=""/>);
    expect(baseElement).toBeDefined();
  });


  ////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  test('should get a gyms badges', () => {
      
      ( async()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/gym/a4f`,{
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

