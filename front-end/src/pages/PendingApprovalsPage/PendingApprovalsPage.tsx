import {IonContent, IonText, IonPage, IonHeader,IonButton, IonIcon} from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import React, {useState} from 'react'
import ApprovalButton from '../../components/approvalButton/ApprovalButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './PendingApprovalsPage.css';


export type UploadActivityStates = {act?:any}

const PendingApprovalsPage: React.FC = () =>{

    let gymId= 'lttD';
    // eslint-disable-next-line
    const [claims, setClaims] = useState(new Array());

    //GET REQUEST:
    const getClaims=()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim?gid=${gymId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            //console.log(response);
            setClaims(response.results)
            
        })
        .catch(err => {console.log(err)})
    }

    
    
        getClaims();
        //console.log(claims);
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
                    {
                        claims?.map(el =>{
                            //console.log('hello');
                            return ( <ApprovalButton userID={el.email} username={el.username} badgeId={el.b_id} key={el.email}></ApprovalButton>)
                        })
                    }
                    
                </IonContent>
            </IonPage>
        )
        

}

export default PendingApprovalsPage;