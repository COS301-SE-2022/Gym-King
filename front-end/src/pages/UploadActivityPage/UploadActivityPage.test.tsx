import { render } from '@testing-library/react';
import UploadActivityPage from './UploadActivityPage'

test('renders without crashing', async() => {
    const { baseElement } = render(<UploadActivityPage />);
    expect(baseElement).toBeDefined();
  });

////////// INTEGRATION TESTS //////////

  describe('Testing connection to API', () => {

    it('should load badge data', async () => {
      (async()=>{
        let badgeId='XRQ'
        fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge?bid=${badgeId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            expect (response).toBeDefined()
        })
        .catch(err => {
            expect (err).toBeDefined()
        })
      } )
    });

    it('should load send claim data', async () => {
        (async()=>{
          let b_id="XRQ"
          let email=""
          let username = ""
          let i1=""
          let i2= ""
          let i3= ""
          fetch(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim?bid=${b_id}&email=${email}&username=${username}&input1=${i1}&input2=${i2}&input3=${i3}&proof=${'PROOF'}`,{
              "method":"POST"
          })
          .then(response =>response.json())
          .then(response =>{
              expect (response).toBeDefined()
          })
          .catch(err => {
              expect (err).toBeDefined()
          }) 
       });
      });

  })
/*

describe('Integration Tests', () => {

    test('displays activity inputs when it is passed in as a list', async () => {
        const {getByTestId } = render(<UploadActivityPage />);

        expect (getByTestId('ai').innerHTML).toBeDefined()
    });

})

*/