import React from 'react'
import {IonContent, IonText, IonPage, IonHeader } from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import FriendRequestList from '../../components/FriendRequestsList/FriendRequestList';

const FriendRequests: React.FC = () =>{


    //=================================================================================================
    //    Render
    //=================================================================================================
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Friend Requests</IonText>

                    <FriendRequestList ></FriendRequestList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default FriendRequests;