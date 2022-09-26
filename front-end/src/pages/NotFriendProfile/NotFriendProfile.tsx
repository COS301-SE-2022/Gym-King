import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton, useIonViewDidEnter} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';



const NotFriendProfile: React.FC = () =>{
        //localStorage.setItem("friendRequest","true")
        const sendFriendRequest = ()=>{
        }
        
        const [username, setUsername]= useState("")
        const [email, setEmail]= useState("")
        const [fullname, setFullname]= useState("")
        const [profilePicture, setProfilePicture]= useState("")

        useIonViewDidEnter(()=>{
            setUsername(sessionStorage.getItem("foundUsername")!)
            setEmail((sessionStorage.getItem("foundEmail")!))
            setFullname(sessionStorage.getItem("foundFullname")!)
            setProfilePicture(sessionStorage.getItem("foundProfilePicture")!)
        })

        return(
            <IonPage >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        {
                            sessionStorage.getItem("isFriendRequest")==="true"
                            &&
                            <IonRow >
                                <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol >
                                                <i className="center">user234 wants to follow you</i>
                                            </IonCol>
                                        </IonRow>
                                        
                                    </IonGrid>
                                </IonCard>
                            </IonRow>
                        }
                        <IonRow >
                            <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${profilePicture})`}} alt="" className="userImage centerComp contain"  ></IonImg>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText color="light" className="PageTitle center un">{username}</IonText>
                                            </IonRow>
                                            <IonRow>
                                                <i className="center">{fullname}</i>
                                            </IonRow>
                                            
                                        </IonCol>
                                    </IonRow>
                                    <br></br><br></br>
                                    <IonRow>
                                        <IonButton onClick={sendFriendRequest}>Send Friend Request</IonButton>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>
                
                </IonContent>
            </IonPage>
        )
        

}

export default NotFriendProfile;
