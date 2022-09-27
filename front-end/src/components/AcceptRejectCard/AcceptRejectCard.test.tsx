import { render } from '@testing-library/react';
import AcceptRejectCard from './AcceptRejectCard'


test('renders without crashing',async () => {
    const { baseElement } = await render(<AcceptRejectCard profile="" userID="" username="" badgeId="" badgename="" badgechallenge="" i1="" i2="" i3="" activitytype="" history="" proof=""/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*
  - test if the accept button works 
  - test if the reject button works 
  - test if badge image displays
  - test if proof displays 

*/

describe('Testing prop text values', () => {
  let username = "user1"


  test('correctly displays username', async () => {
      const {baseElement} =  render(<AcceptRejectCard profile="" userID="" username={username} badgeId="" badgename="" badgechallenge="" i1="" i2="" i3="" activitytype="" history="" proof="" />);
      expect (baseElement).toHaveTextContent(username);
  });
  test('correctly displays strength activitytype inputs', async  () => {
    const {baseElement} =   render(<AcceptRejectCard profile="" userID="" username="" badgeId="" badgename="" badgechallenge="" i1="" i2="" i3="" activitytype="STRENGTH" history="" proof=""/>);
    expect (baseElement).toHaveTextContent("Weight");
    expect (baseElement).toHaveTextContent("Sets");
    expect (baseElement).toHaveTextContent("Reps");
  });
  test('correctly diplays input values', async () => {
    const {baseElement} = render(<AcceptRejectCard profile="" userID="" username="" badgeId="" badgename="" badgechallenge="" i1="1" i2="2" i3="3" activitytype="STRENGTH"  history="" proof=""/>);
    expect (baseElement).toHaveTextContent("1");
    expect (baseElement).toHaveTextContent("2");
    expect (baseElement).toHaveTextContent("3");
  });
  
  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<AcceptRejectCard profile="" userID="" username="" badgeId="" badgename=""  badgechallenge=""i1="" i2="" i3="" activitytype="CARDIO" history="" proof=""/>);
    expect (baseElement).toHaveTextContent("Duration");
    expect (baseElement).toHaveTextContent("Distance");
    expect (baseElement).toHaveTextContent("Level of Difficulty");
  });  

  test('correctly displays badgename', async () => {
    const {baseElement} = render(<AcceptRejectCard profile="" userID="" username="" badgeId="" badgename="badge" badgechallenge="" i1="" i2="" i3="" activitytype="" history="" proof=""/>);
    expect (baseElement).toHaveTextContent("badge");
  });
});

////////// INTEGRATION TESTS //////////

describe('Testing connection to api', () => {

  it('should update claim data',  () => {
      
     let test = (async()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim`,{
            "method":"PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                bid: "",
                email: ""
            })
        })
        .then(response =>response.json())
        .then(response =>{
            expect(response).toBeDefined()
        })
        .catch(err => {
          console.log(err)
          expect(err).toBeDefined()

        }) 
      } )

      test()
  });

  it('should reject a gym',  () => {
    let test= (async()=>{
        await fetch(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim`,{
            "method":"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                bid: "",
                email: ""
            })
        })
        .then(response =>response.json())
        .then(response =>{
            expect(response).toBeDefined()

        })
        .catch(err => {
          console.log(err)
          expect(err).toBeDefined()
        })
      } )

      test()
  });

})