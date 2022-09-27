import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton, useIonViewDidEnter, useIonViewDidLeave} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const NotFriendProfile: React.FC = () =>{
        //localStorage.setItem("friendRequest","true")
        let history=useHistory()

        
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

        const sendFriendRequest = ()=>{
            axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/CreateRequest`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    fromEmail: localStorage.getItem("email"),
                    toEmail:  email
    
                })
            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
                history.goBack()
            })
            .catch(err => {
                console.log(err)
                
            })
        }

        useIonViewDidLeave(()=>{
            sessionStorage.removeItem("foundUsername")
            sessionStorage.removeItem("foundEmail")
            sessionStorage.removeItem("foundFullname")
            sessionStorage.removeItem("foundProfilePicture")
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
