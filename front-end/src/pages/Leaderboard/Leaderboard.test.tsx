
import { render} from '@testing-library/react';
import Leaderboard from '../Leaderboard/Leaderboard';



//RENDER TESTS
test('renders without crashing', () => {
    const { baseElement } = render(<Leaderboard/>);
    expect(baseElement).toBeDefined();
});

///////// INTEGRATION TESTS //////////
describe('Testing connection to api', () => {
    test("API fetch scores",()=>{
        var scores:any=[]
        var gymid="lttD"

        fetch(process.env["REACT_APP_GYM_KING_API"]+`/leaderboard/score?gid=${gymid}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log("this is the response")
            console.log(response)
            scores=response
        
        })
        .catch(err => {console.log(err)})
        expect(scores).toBeDefined();
    
    })
})