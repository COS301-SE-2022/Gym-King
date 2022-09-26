import React from 'react'
import {IonContent, IonText, IonPage, IonHeader } from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import FriendRequestList from '../../components/FriendRequestsList/FriendRequestList';

const FriendRequests: React.FC = () =>{

    // eslint-disable-next-line 
    let friendsList= [{"username":"mscott", "profile":"", "email":"mscott@gmail.com"},{"username":"mscott", "profile":"", "email":"mscott@gmail.com"},{"username":"mscott", "profile":"", "email":"mscott@gmail.com"}]

    
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

                    <FriendRequestList requests={friendsList}></FriendRequestList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default FriendRequests;