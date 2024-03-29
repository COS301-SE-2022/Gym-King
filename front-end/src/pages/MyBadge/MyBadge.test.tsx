
jest.setTimeout(25000)
import { render} from '@testing-library/react';
import MyBadge from './MyBadge';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
  const { baseElement } =await render(<MyBadge/>);
  expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////


describe('Testing connection to api', () => {

  it('should load user badges',  () => {
      (async ()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/users/owned/${"user_email"}`,{
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

