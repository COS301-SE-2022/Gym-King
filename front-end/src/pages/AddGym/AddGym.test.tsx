import {render} from '@testing-library/react';
import AddGym from './AddGym';
/*UNIT TESTING*/


//test if pages rendered
test('renders without crashing', async() => {
    const { baseElement } = await render(<AddGym />);
    expect(baseElement).toBeDefined();
});/*

test('correctly displays labels', async () => {
  const {baseElement} = render(<AddGym/>);
  expect (baseElement).toHaveTextContent("Name:");
  expect (baseElement).toHaveTextContent("Address:");
});


////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {
  let badgeId= "XRQ"

  it('should add a gym', async () => {
      (()=>{
        fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            gymBrandName: "gymName",
            gymAddress: "gymAddress",
            gymCoordLong: "coordinate[1]",
            gymCoordLat: "coordinate[0]",
            gymIcon: "gymIcon"
          })
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          expect(response).toBeDefined()
        })
        .catch((err) => {
          console.log(err);
          expect(err).toBeDefined()
        });      
      }) 
  });

  it('should add owned gym', async () => {
      
      (()=>
      {
          fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned`,
          {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: "localStorage.getItem('email')",
              gid: ""
            })
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            expect(response).toBeDefined()
          })
          .catch((err) => {
            console.log(err);
            expect(err).toBeDefined()

          });
      })
  });
})
*/
