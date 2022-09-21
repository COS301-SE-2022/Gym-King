import React, {useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonItem, IonLabel} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import FriendsList from '../../components/FriendsList/FriendsList';

const FriendsPage: React.FC = () =>{

    const [numFriendRequests, setNumFriendRequests] = useState(1);
    setNumFriendRequests(1);
    let friendsList= [{"username":"mscott", "profile":"", "email":"mscott@gmail.com"},{"username":"mscott", "profile":"", "email":"mscott@gmail.com"},{"username":"mscott", "profile":"", "email":"mscott@gmail.com"}]

    const goToFriendRequests=()=>{

    }
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
                    <IonText className='PageTitle center'>My Friends</IonText>
                    {
                        numFriendRequests!==0 
                        &&
                        <IonItem button detail class='btnApproval' onClick={goToFriendRequests} >
                            <IonLabel>Friend Requests</IonLabel>
                        </IonItem>
                    }

                    <IonText className="inputHeading">All Friends</IonText>
                    <FriendsList friendsList={friendsList}></FriendsList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default FriendsPage;