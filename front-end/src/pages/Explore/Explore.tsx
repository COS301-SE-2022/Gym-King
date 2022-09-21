import React, {useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonItem, IonLabel, IonSearchbar} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import FriendsList from '../../components/FriendsList/FriendsList';
import { useHistory } from 'react-router-dom';

const Explore: React.FC = () =>{

    let history=useHistory()
    // eslint-disable-next-line 
    const [numFriendRequests, setNumFriendRequests] = useState(1);
    let friendsList= [{"username":"mscott", "profile":"", "email":"mscott@gmail.com"},{"username":"mscott", "profile":"", "email":"mscott@gmail.com"},{"username":"mscott", "profile":"", "email":"mscott@gmail.com"}]

    const goToFriendRequests=()=>{
        history.push("/FriendRequests")
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
                    <IonText className='PageTitle center'>Explore</IonText>

                    <IonText className='inputHeading'>Find Friends</IonText>
                    <IonSearchbar></IonSearchbar>
                    <br></br><br></br>

                    <IonText className='inputHeading'>Suggested Badges</IonText>
                    
                    
                </IonContent>
            </IonPage>
        )
        

}

export default Explore;