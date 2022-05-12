import {IonIcon, IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './approvalButton.css'
import {personCircleOutline} from 'ionicons/icons';


//creating a type so props can be entered
export type props = {userID:number, username:string, badgeId:string};


export class ApprovalButton extends React.Component<props>{

    userId = (this.props.userID).toString();
    onClick= () =>{
        localStorage.setItem('email', this.userId);
        localStorage.setItem('badgeId', this.props.badgeId);
        localStorage.setItem('username', this.props.username);
    }


    render(){
        //console.log(this.userId);
        return(
            <IonItem button detail class='btnApproval' onClick={this.onClick} href='http://localhost:3000/AcceptReject'>
                <IonIcon icon={personCircleOutline} className='userProfile'></IonIcon>
                <IonLabel>{this.props.username}</IonLabel>
            </IonItem>
        )
        
    }
}

export default ApprovalButton;