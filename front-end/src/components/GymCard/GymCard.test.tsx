import {render} from '@testing-library/react';
import GymCard from './GymCard';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', async() => {
  const { baseElement } =await render(<GymCard brand="" id="" name="" address='' deleteClicked=""/>);
  expect(baseElement).toBeDefined();
});

describe('Testing prop text values', () => {

    
    test('correctly displays gym card info', async () => {
        const { baseElement } = await render(<GymCard brand ="" id="" name="a gym" address='123 street' deleteClicked=""/>);
        expect (baseElement).toHaveTextContent("a gym");
        expect (baseElement).toHaveTextContent("123 street");
    }); 
  });


////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  test('should delete a badge',  async() => {
      
      let test =( async()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/owner/delete/gym`,
        {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              gid:"",
              "email":"",
              "password":"",
            })
          }
        )
          .then((response) => response.json())
          .then((response) => {
              expect(response).toBeDefined()
          })
          .catch((err) => {
            expect(err).toBeDefined()
          });
      })

      test()
  });
})

