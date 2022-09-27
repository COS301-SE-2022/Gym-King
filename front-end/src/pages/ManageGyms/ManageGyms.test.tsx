import {render,screen} from '@testing-library/react';
import ManageGyms from './ManageGyms';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', async() => {
  const { baseElement } =await render(<ManageGyms/>);
  expect(baseElement).toBeDefined();
  const linkElement = screen.getByText(/My Gyms/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Integration Tests', () => {

  test('sending in a list of activity types displays correctly as a segment button', async () => {
      await render(<ManageGyms />);
      expect(screen.getByTestId('GymCard').innerHTML).toBeDefined()
  });
})


////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  it('should load owned gyms',  () => {
      
      (async ()=>{
          await fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/email`,{
            "method":"GET"
          })
          .then(response =>response.json())
          .then(response =>{
              expect(response).toBeDefined()
          })
          .catch(err => {
              expect(err).toBeDefined()
          })
      } )
  });

  it('should delete a gym',  () => {
      (async()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/email`,{
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