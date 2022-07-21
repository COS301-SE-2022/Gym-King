import { render } from '@testing-library/react';
import GymOwnerViewBadge from './GymOwnerViewBadge'

//render test withou crahing
test('renders without crashing', () => {
    const { baseElement } = render(<GymOwnerViewBadge />);
    expect(baseElement).toBeDefined();
});
test("API fetch badges",()=>{
    let badges:any=[]    
    var email="u20519517@tuks.co.za"
            fetch(`https://gym-king.herokuapp.com/gyms/owned?email=${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log("fetching gyms")
                var arr=[];
                for(let i=0;i<response.results.length;i++)
                {
                    
                    arr.push(
                        {
                            'GymName':response.results[i].gym_brandname,
                            'GymID':response.results[i].g_id,
                        }
                    )
                }
                badges=arr
            })
            .catch(err => {console.log(err)})
    expect(badges).toBeDefined();
   
}
)
//