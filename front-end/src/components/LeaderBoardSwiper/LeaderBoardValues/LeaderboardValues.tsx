import { IonCol, IonGrid, IonRow, IonText} from '@ionic/react';
import './LeaderboardValues.css'

export const LeaderboardValues=(props:{scores:any[]})=>
{
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
    <IonGrid className="glass">
       <IonRow >
          <IonCol size="1">
           <IonText className="light">#</IonText>
          </IonCol>
          <IonCol size="9">
            <IonText className="light">username</IonText>
          </IonCol>
          <IonCol size="2">
            <IonText className="light">points</IonText>
          </IonCol>
        </IonRow> 
      <IonRow class="FirstPlace">
          <IonCol  size="1">
            1
          </IonCol>
          <IonCol  size="9">
            {FirstPlace.username}
          </IonCol>
          <IonCol  size="2">
            {FirstPlace.points} pts
          </IonCol>
      </IonRow>
      <IonRow class="SecondPlace">
          <IonCol  size="1">
            2
          </IonCol>
          <IonCol  size="9">
            {SecondPlace.username}
          </IonCol>
          <IonCol  size="2">
            {SecondPlace.points} pts
          </IonCol>
      </IonRow>
      <IonRow class="ThirdPlace">
          <IonCol  size="1">
            3
          </IonCol>
          <IonCol  size="9">
            {ThirdPlace.username}
          </IonCol>
          <IonCol  size="2">
            {ThirdPlace.points} pts
          </IonCol>
      </IonRow>
      {top10.map((el:any)=>
         <IonRow key={el.pos} >
            <IonCol  size="1" >
              {el.pos}
            </IonCol>
            <IonCol  size="9">
              {el.username}
            </IonCol>
            <IonCol  size="2">
              {el.points}pts
            </IonCol>
         </IonRow>
        )}
        <IonRow class="You">
          <IonCol  size="1">
            {count}
          </IonCol>
          <IonCol  size="9">
            {yourscore.username}
          </IonCol>
          <IonCol  size="2">
            {yourscore.points}pts
          </IonCol>
      </IonRow>
      </IonGrid>
        )
        
    
}

export default LeaderboardValues;