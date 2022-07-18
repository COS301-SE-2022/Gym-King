import {IonContent, IonText, IonPage, IonHeader} from '@ionic/react';
import React, {useState} from 'react'
import { useEffect } from 'react';
import ApprovalButton from '../../components/approvalButton/approvalButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './PendingBadges.css';


export type UploadActivityStates = {act?:any}

const PendingBadgesPage: React.FC = () =>{

    //STATES AND VARIABLES 
    const [claims, setClaims] = useState(new Array());

    //GET REQUEST:
    useEffect(()=>{
        fetch(`https://gym-king.herokuapp.com/users/claims/${localStorage.getItem("email")}`,{
                method: 'GET'
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                if(response != null)
                {
                    //has claims 
                    setClaims(response)
                }
            })
            .catch(err => {
                console.log(err)
        })
    },[])

        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Pending Badges</IonText>
                    
                    {
                        claims?.map(el =>{
                            return ( <ApprovalButton userID={el.email} username={el.username} badgeId={el.b_id} key={el.email + el.b_id}></ApprovalButton>)
                        })
                    }
                </IonContent>
            </IonPage>
        )
        

}

export default PendingBadgesPage;
