import {render,screen} from '@testing-library/react';
import { response } from 'express';
import GymCard from './GymCard';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', () => {
  const { baseElement } = render(<GymCard brand="" id="" name="" address='' deleteClicked=""/>);
  expect(baseElement).toBeDefined();
});

describe('Testing prop text values', () => {

    
    test('correctly displays gym card info', async () => {
        render(<GymCard brand ="" id="" name="a gym" address='123 street' deleteClicked=""/>);
        expect(screen.getByText(/a gym/i)).toBeInTheDocument();
        expect(screen.getByText(/123 street/i)).toBeInTheDocument();
    }); 
  });


////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  test('should delete a badge',  () => {
      
      ( ()=>{
        fetch(process.env["REACT_APP_GYM_KING_API"]+`/owner/delete/gym`,
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
  });
})

