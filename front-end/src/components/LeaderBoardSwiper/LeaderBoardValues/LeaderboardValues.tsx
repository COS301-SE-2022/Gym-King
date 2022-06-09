import { IonCol, IonRow} from '@ionic/react';
import './LeaderboardValues.css'

export const LeaderboardValues=(props:{scores:any[]})=>{
    for(let i=props.scores.length;i<10+1;i++)
    {
      props.scores.push({
        "username":"-",
        "points":"-"
      })
    }
    let FirstPlace:any=props.scores[0]
    let SecondPlace:any=props.scores[1]
    let ThirdPlace:any=props.scores[2]
    let top10:any=[]
    for(let i=3;i<10;i++){
      top10.push(
        { 
          'pos':i+1,
          'username':props.scores[i].username,
          'points':props.scores[i].points
          })
    }

    let username="Gates";
    let yourscore:any=[]
    let count=0;
    for(let i=0;i<props.scores.length;i++)
    {
      count=count+1;
      if(username===props.scores[i].username)
      {
        yourscore=props.scores[i];
        break;
      }
    }
    return(
    <div>
       <IonRow >
          <IonCol>
           <strong> pos</strong>
          </IonCol>
          <IonCol>
            <strong>username</strong>
          </IonCol>
          <IonCol>
            <strong>points</strong>
          </IonCol>
        </IonRow> 
        <br></br>   
      <IonRow class="FirstPlace">
          <IonCol>
            #1
          </IonCol>
          <IonCol>
            {FirstPlace.username}
          </IonCol>
          <IonCol>
            {FirstPlace.points} pts
          </IonCol>
      </IonRow>
      <br></br>
      <IonRow class="SecondPlace">
          <IonCol>
            #2
          </IonCol>
          <IonCol>
            {SecondPlace.username}
          </IonCol>
          <IonCol>
            {SecondPlace.points} pts
          </IonCol>
      </IonRow>
      <br></br>
      <IonRow class="ThirdPlace">
          <IonCol>
            #3
          </IonCol>
          <IonCol>
            {ThirdPlace.username}
          </IonCol>
          <IonCol>
            {ThirdPlace.points} pts
          </IonCol>
      </IonRow>
      <br></br>
      {top10.map((el:any)=>
         <IonRow key={el.pos} >
            <IonCol>
              {el.pos}
            </IonCol>
            <IonCol>
              {el.username}
            </IonCol>
            <IonCol>
              {el.points}pts
            </IonCol>
         </IonRow>
        )}
        <br>
        </br>
        <IonRow class="You">
          <IonCol>
            #{count}
          </IonCol>
          <IonCol>
            {yourscore.username}
          </IonCol>
          <IonCol>
            {yourscore.points}pts
          </IonCol>
      </IonRow>
        <br></br>
      </div>
        )
        
    
}

export default LeaderboardValues;