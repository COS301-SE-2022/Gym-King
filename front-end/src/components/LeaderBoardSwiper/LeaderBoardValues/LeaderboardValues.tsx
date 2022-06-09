import { IonCol, IonRow} from '@ionic/react';
import './LeaderboardValues.css'

export const LeaderboardValues=()=>{
    const list=[
        {'pos':4,'name':'Tracy21','pts':98},
        {'pos':5,'name':'Eliot25','pts':93},
        {'pos':6,'name':'Brendan','pts':94},
        {'pos':7,'name':'Lorolei','pts':92},
        {'pos':8,'name':'Louis','pts':80},
        {'pos':9,'name':'Dorris','pts':60},
        {'pos':10,'name':'Mac','pts':10},
      ]
    return(
    <div>
       <IonRow >
          <IonCol>
            pos
          </IonCol>
          <IonCol>
            username
          </IonCol>
          <IonCol>
            points
          </IonCol>
        </IonRow>    
      <IonRow class="FirstPlace">
          <IonCol>
            #1
          </IonCol>
          <IonCol>
            DANNY
          </IonCol>
          <IonCol>
            125pts
          </IonCol>
      </IonRow>
      <IonRow class="SecondPlace">
          <IonCol>
            #2
          </IonCol>
          <IonCol>
            Jim
          </IonCol>
          <IonCol>
            120pts
          </IonCol>
      </IonRow>
      <IonRow class="ThirdPlace">
          <IonCol>
            #3
          </IonCol>
          <IonCol>
            Bob
          </IonCol>
          <IonCol>
            115pts
          </IonCol>
      </IonRow>
      {list.map(el=>
         <IonRow >
            <IonCol>
              {el.pos}
            </IonCol>
            <IonCol>
              {el.name}
            </IonCol>
            <IonCol>
              {el.pts}pts
            </IonCol>
         </IonRow>
        )}
        <br>
        </br>
        <IonRow class="You">
          <IonCol>
            #25
          </IonCol>
          <IonCol>
            YOU
          </IonCol>
          <IonCol>
            0pts
          </IonCol>
      </IonRow>
        <br></br>
      </div>
        )
        
    
}

export default LeaderboardValues;