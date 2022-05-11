import { IonContent, IonHeader, IonText, IonPage} from '@ionic/react';
import React from 'react'
import AcceptRejectCard from '../../components/AcceptRejectCard/AcceptRejectCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AcceptReject.css';

export class AcceptRejectPage extends React.Component {

    //GET REQUEST:
    badgeId = 0;
    email = 'abc@def.com';
    claim :any;

    getClaim=()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${this.badgeId}&email=${this.email}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response);
            this.claim= response;
        })
        .catch(err => {console.log(err)})
    }

    //POST REQUEST:
    input1="";
    input2="";
    input3="";
    proof="";
    acceptClaim=()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${this.badgeId}&email=${this.email}&input1=${this.input1}&input2=${this.input2}&input2=${this.input3}&proof=${this.proof}`,{
            "method":"POST"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response);
        })
        .catch(err => {console.log(err)})
    }
  
    badge= {
        name:'Cycling Champ', 
        description: 'Cycle 10km in 15 minutes to earn this badge!', 
        activityCategory:'cardio',
        activityType:'cycling',
        input1:'00:14:45',
        input2:'10km',
        input3:'4'
    };

    render(){
        let userID:number =Number(localStorage.getItem('user'));
        return (
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Accept/Reject</IonText>
                    <AcceptRejectCard userID={userID} username='jadepeche' badge={this.badge}></AcceptRejectCard>
                </IonContent>
            </IonPage>
        )

    }
}
export default AcceptRejectPage;
