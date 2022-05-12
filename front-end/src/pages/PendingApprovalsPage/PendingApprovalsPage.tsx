import {IonContent, IonText, IonPage, IonHeader,IonButton, IonIcon} from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import React from 'react'
import ApprovalButton from '../../components/approvalButton/approvalButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './PendingApprovalsPage.css';


export type UploadActivityStates = {act?:any}

export class PendingApprovalsPage extends React.Component{

    gymId= 'a7nw';
    claims: any;

    //GET REQUEST:
    getClaims=()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim?gid=${this.gymId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response);
            this.claims= response;
        })
        .catch(err => {console.log(err)})
    }

    
    render(){
        this.getClaims()
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Pending Approvals</IonText>
                    <IonButton className='btnInfo shadow ' background-color='#0F005A'>
                        <IonIcon icon={informationCircleOutline} className='infoIcon'></IonIcon>
                        <IonText>What should I do?</IonText>
                    </IonButton>
                    <ApprovalButton userID={1} username="jadepeche"></ApprovalButton>
                    <ApprovalButton userID={2} username="robynhancock"></ApprovalButton>
                    <ApprovalButton userID={3} username="ryanbroemer"></ApprovalButton>
                    <ApprovalButton userID={4} username="dylan"></ApprovalButton>
                    <ApprovalButton userID={5} username="thivessh"></ApprovalButton>
                </IonContent>
            </IonPage>
        )
        
    }
}

export default PendingApprovalsPage;
