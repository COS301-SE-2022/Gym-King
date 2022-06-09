
import { IonGrid } from '@ionic/react';
import { render} from '@testing-library/react';
import ViewBadgePage from './ViewBadgePage';

//data-testid="btnSeg"
//testing API
test("API fetch badges",()=>{
    let badge:any=[]    
    var gymid="lttD"

    fetch(`https://gym-king.herokuapp.com/badges/gym?gid=${gymid}`,{
        "method":"GET"
    })
    .then(response =>response.json())
    .then(response =>{
        console.log("this is the response")
        console.log(response)
        badge=response
       
    })
    .catch(err => {console.log(err)})
    expect(badge).toBeDefined();
   
}
)
//RENDER TESTS
test('renders without crashing', () => {
    const { baseElement } = render(<ViewBadgePage/>);
    expect(baseElement).toBeDefined();
});



test('creates badge Grid', () => {
    const { baseElement } = render(<IonGrid/>);
    expect(baseElement).toBeDefined();
});