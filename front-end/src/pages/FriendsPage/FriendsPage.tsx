import React, { useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonItem, IonLabel, useIonViewWillEnter, IonLoading, IonButton} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import FriendsList from '../../components/FriendsList/FriendsList';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const FriendsPage: React.FC = () =>{

    let history=useHistory()
    // eslint-disable-next-line 
    const [numFriendRequests, setNumFriendRequests] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);

    const goToFriendRequests=()=>{
        history.push("/FriendRequests")
    }

    const [friends, setFriends] = useState([]);

    useIonViewWillEnter(()=>{
        setLoading(true)
        
        console.log("ion page entered")
        //remove session storage
        sessionStorage.removeItem("friendUsername")
        sessionStorage.removeItem("friendEmail")
        sessionStorage.removeItem("friendProfile")
        sessionStorage.removeItem("friendFullname")
        
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getFriends`,{
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
            setFriends(response)
        
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
            
            setFriends([])
            
        })
        console.log(friends)

    },[])
    //=================================================================================================
    //    Render
    //=================================================================================================
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>MY FRIENDS</IonText>
                    {
                        numFriendRequests!==0 
                        &&
                        <IonButton mode="ios" color='warning' className='width80 btn'  onClick={goToFriendRequests}>View Friend Requests</IonButton>
                    }
                    <br></br><br></br>

                    <FriendsList friendsList={friends}></FriendsList>
                    

                    <IonLoading 
                        isOpen={loading}
                        mode="ios"
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default FriendsPage;