import {IonAvatar, IonImg, IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './approvalButton.css'


//creating a type so props can be entered
export type props = {userID:number, username:string, badgeId:string, profile:string};


export class ApprovalButton extends React.Component<props>{

    userId = (this.props.userID).toString();

    onClick= () =>{
        
        localStorage.setItem('user_email', this.userId);
        localStorage.setItem('user_badgeId', this.props.badgeId);
        localStorage.setItem('user_username', this.props.username);

    }


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