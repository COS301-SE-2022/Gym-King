/** 
* @file approvalButton.tsx
* @brief component that displays the username of the user that sent in a claim; opens AcceptReject page when clicked
*/

import {IonAvatar, IonImg, IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './approvalButton.css'
import {personCircleOutline} from 'ionicons/icons';

//-props, user and badge info
export type props = {userID:number, username:string, badgeId:string, profile:string};

/** 
  * @param ? props
  * @return ? - ApprovalButton component
*/
export class ApprovalButton extends React.Component<props>{

    //-userId, stores the userId from props 
    userId = (this.props.userID).toString();

    /** 
     * @brief ! - Sets localStorage variables to store user information when button is clicked
    */
    onClick= () =>{
        
        localStorage.setItem('user_email', this.userId);
        localStorage.setItem('user_badgeId', this.props.badgeId);
        localStorage.setItem('user_username', this.props.username);

    }

    //=================================================================================================
    //    Render
    //=================================================================================================
    render(){
        //console.log(this.userId);
        return(
            <IonItem button detail class='btnApproval' onClick={this.onClick} data-testid="aB">
                <IonIcon icon={personCircleOutline} className='userProfile'></IonIcon>
                <IonLabel>{this.props.username}</IonLabel>
            </IonItem>
        )
        
    }
}

export default ApprovalButton;
