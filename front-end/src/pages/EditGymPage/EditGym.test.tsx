import {render,screen} from '@testing-library/react';
import EditGym from './EditGym';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', async() => {
  const { baseElement } = render(<EditGym/>);
  expect(baseElement).toBeDefined();
  const linkElement = screen.getByText(/Edit Gym/i);
  expect(linkElement).toBeInTheDocument();
});


////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  it('should load gym data', async () => {
      
      ( ()=>{
          let badgeId="XRQ"
          fetch(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/123`,
            {
              method: "Get",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
          .then((response) => response.json())
          .then((response) => {
            expect(response).toBeDefined()
          })
          .catch((err) => {
            expect(err).toBeDefined()
          });
      } )
  });

  it('should update a gym', async () => {
      (()=>{
        fetch(process.env["REACT_APP_GYM_KING_API"]+`/owner/gym/info`,
        {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            gid:sessionStorage.getItem("gid"),
            brandname: "gymName", 
            address:"gymAddress",
            lat:"coordinate[0]",
            long:"coordinate[1]",
            icon:"gymIcon"
          })
        })
        .then((response) => response.json())
        .then((response) => {
          expect(response).toBeDefined()
        })
        .catch((err) => {
          expect(err).toBeDefined()
        });
      } )
  });

})