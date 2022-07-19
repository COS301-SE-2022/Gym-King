import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText} from '@ionic/react';
import React from 'react'
import './AcceptRejectCard.css'
import {personCircleOutline} from 'ionicons/icons';
import {documentOutline} from 'ionicons/icons';
import ActivityList from '../ActivityList/ActivityList';
import 'react-toastify/dist/ReactToastify.css';


//creating a type so props can be entered
export type props = {userID:any, username:any, badgeId:any, badgename:any, i1:any, i2:any, i3:any, activitytype:any};


export class AcceptRejectCard extends React.Component<props>{

    acceptClaim= ()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${this.props.badgeId}&email=${this.props.userID}`,{
            "method":"PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                bid: this.props.badgeId,
                email: this.props.userID
            })
        })
        .then(response =>response.json())
        .then(response =>{
            //console.log(response.results);
            //display toast 
            //redirect to PendingApprovals
            window.location.href = "http://localhost:3000/PendingApprovals";
        })
        .catch(err => {console.log(err)})
    } 
    rejectClaim = () =>{
        fetch(`https://gym-king.herokuapp.com/claims/claim`,{
            "method":"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                bid: this.props.badgeId,
                email: this.props.userID
            })
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response.results);
            //display toast 
            //redirect to PendingApprovals
            window.location.href = "http://localhost:3000/PendingApprovals";
        })
        .catch(err => {console.log(err)})
    }
    render(){
        
        return(
            <IonCard data-testid="ARC" className="glass arCard">
                 <div style={{backgroundColor: "#321E93"}}>
                    <IonIcon icon={personCircleOutline} className='userProfile'></IonIcon>
                    <IonText className='username'>{this.props.username}</IonText>
                </div>
                <IonCardContent>
                    <IonText className='Subheading'>
                        Badge:
                    </IonText><br></br>
                    <IonText className='txtBadge'>
                        {this.props.badgename}
                    </IonText>
                    <br></br><br></br>
                    <ActivityList  activityCategory={this.props.activitytype} i1={this.props.i1} i2={this.props.i2} i3={this.props.i3}></ActivityList>
                    <br></br><br></br>
                    <IonText className='Subheading'>Proof:</IonText>
                    <IonCard className='justify'>
                        <IonCardContent >
                            <IonIcon icon={documentOutline} className='imgIcon'></IonIcon>     
                        </IonCardContent>
                    </IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton color='warning' onClick={this.acceptClaim}>Accept</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color='secondary' onClick={this.rejectClaim}>Reject</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
            
        )
        
    }
}

export default AcceptRejectCard;



