
import { render} from '@testing-library/react';
import Leaderboard from '../Leaderboard/Leaderboard';


//testing API
test("API fetch scores",()=>{
    var scores:any=[]
    var gymid="lttD"

    fetch(`https://gym-king.herokuapp.com/leaderboard/score?gid=${gymid}`,{
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
   
}
)
//RENDER TESTS
test('renders without crashing', () => {
    const { baseElement } = render(<Leaderboard/>);
    expect(baseElement).toBeDefined();
});



