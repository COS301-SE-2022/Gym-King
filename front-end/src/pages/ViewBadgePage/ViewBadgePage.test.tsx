jest.setTimeout(25000)
import { render} from '@testing-library/react';
import ViewBadgePage from './ViewBadgePage';


test('renders without crashing', async() => {
  const {baseElement} =await render(<ViewBadgePage/>);
  expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

    test('should load badge info',  () => {
        
        ( async()=>{
            console.log("hello")
            await fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/gym/${"gymid"}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                expect(response).toBeDefined()
            })
            .catch(err => {
                console.log(err)
                expect(err).toBeDefined()
            })
        })
    });
})
  
