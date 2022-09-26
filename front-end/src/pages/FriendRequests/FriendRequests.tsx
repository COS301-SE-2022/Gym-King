import React, {useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, useIonViewWillEnter } from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import FriendRequestList from '../../components/FriendRequestsList/FriendRequestList';
import axios from "axios";

const FriendRequests: React.FC = () =>{

    // eslint-disable-next-line 

    const [requests, setRequests] = useState([])
    useIonViewWillEnter(()=>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getReceivedRequests`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                userEmail: localStorage.getItem("email"),

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setRequests(response)
        })
        .catch(err => {
            console.log(err)
            
        })

    },[])
    //=================================================================================================
    //    Render
    //=================================================================================================
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Friend Requests</IonText>

                    <FriendRequestList requests={requests}></FriendRequestList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default FriendRequests;