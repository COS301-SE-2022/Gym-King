/** 
* @file approvalButton.tsx
* @brief component that displays the username of the user that sent in a claim; opens AcceptReject page when clicked
*/

import {IonAvatar, IonImg, IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './approvalButton.css'

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
        localStorage.setItem('user_profile', this.props.profile);

    }

    //=================================================================================================
    //    Render
    //=================================================================================================
    render(){
        //console.log(this.userId);
        return(
            <IonItem button detail class='btnApproval' onClick={this.onClick} data-testid="aB">
                <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                    <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${this.props.profile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                </IonAvatar>
                <IonLabel>{this.props.username}</IonLabel>
            </IonItem>
        )
        
    }
}

export default ApprovalButton;