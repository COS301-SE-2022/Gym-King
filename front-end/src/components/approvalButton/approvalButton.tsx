import {IonButton, IonIcon, IonText, IonGrid, IonRow} from '@ionic/react';
import React from 'react'
import './approvalButton.css'
import {personCircleOutline} from 'ionicons/icons';
import {chevronForwardOutline} from 'ionicons/icons';


//creating a type so props can be entered
export type props = {userID:number, username:string};


export class ApprovalButton extends React.Component<props>{
    render(){
        return(
            <IonButton className='btnApproval'>
                <IonGrid>
                    <IonRow>
                        
                            <IonIcon icon={personCircleOutline} className='userProfile'></IonIcon>
                            <IonText class="username">{this.props.username}</IonText>
                            <IonIcon icon={chevronForwardOutline} className='arrowIcon'></IonIcon>
                    </IonRow>
                    
                </IonGrid>
                
            </IonButton>
        )
        
    }
}

export default ApprovalButton;