import {IonIcon, IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './approvalButton.css'
import {personCircleOutline} from 'ionicons/icons';

//creating a type so props can be entered
export type props = {userID:number, username:string};


export class ApprovalButton extends React.Component<props>{
    render(){
        return(
            <IonItem button detail class='btnApproval'  >
                <IonIcon icon={personCircleOutline} className='userProfile'></IonIcon>
                <IonLabel>{this.props.username}</IonLabel>
            </IonItem>
        )
        
    }
}

export default ApprovalButton;