import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonImg, useIonViewWillEnter, IonButton} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";
import FriendBadgeGrid from '../../components/FriendBadgeGrid/FriendBadgeGrid';


const FriendProfile: React.FC = () =>{
    

        let friendUsername = sessionStorage.getItem("friendUsername")
        let friendEmail = sessionStorage.getItem("friendEmail")
        let friendProfile = sessionStorage.getItem("friendProfile")
        let friendFullname = sessionStorage.getItem("friendFullname")

        const [friendBadges, setFriendBadges] = useState([])


        useIonViewWillEnter(async ()=>{
            
            await axios(process.env["REACT_APP_GYM_KING_API"]+`/user/badges`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: friendEmail
                })
            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
                setFriendBadges(response)
            })
            .catch(err => {
                console.log(err)
            })
        
    
        },[])

        const removeFriend = () =>{
            
        }
    
        return(
            <IonPage >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        <IonRow >
                            <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${friendProfile})`}} alt="" className="userImage centerComp contain"  ></IonImg>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText color="light" className="PageTitle center un">{friendUsername}</IonText>
                                            </IonRow>
                                            <IonRow>
                                                <i className="center">{friendFullname}</i>
                                            </IonRow>
                                            
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        <IonRow>
                                <IonCard className="profileCard" >
                                    <IonCardHeader className="inputHeading">{friendUsername}'s badges</IonCardHeader>
                                    <IonCardContent>
                                        <FriendBadgeGrid badges={friendBadges} ></FriendBadgeGrid>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        <IonRow>
                            <IonButton style={{"width":"100%"}} onClick={removeFriend}>Remove Friend</IonButton>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>
                
                </IonContent>
            </IonPage>
        )
        

}

export default FriendProfile;
