import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton, useIonViewDidEnter, useIonViewDidLeave, IonLoading} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";

const NotFriendProfile: React.FC = () =>{
        //localStorage.setItem("friendRequest","true")

        
        const [username, setUsername]= useState("")
        const [email, setEmail]= useState(sessionStorage.getItem("foundEmail"))
        const [fullname, setFullname]= useState("")
        const [profilePicture, setProfilePicture]= useState("")
        const [requstPending, setRequestPending] = useState("non")
        const [loading, setLoading] = useState<boolean>(false);

        useIonViewDidEnter(async()=>{

            setLoading(true)
            setUsername(sessionStorage.getItem("foundUsername")!)
            setEmail((sessionStorage.getItem("foundEmail")!))
            setFullname(sessionStorage.getItem("foundFullname")!)
            setProfilePicture(sessionStorage.getItem("foundProfilePicture")!)

            //see if a request is pending 
            console.log(email)
            await axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/checkIfPendingFriends`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    user1email : localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key"),
                    user2email: email
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                console.log(response)
                setRequestPending(response)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                
            })

        })
        const confirmRequest = ()=>{
            setLoading(true)
            axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/CreateRequest`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    fromEmail: email,
                    toEmail: localStorage.getItem("email")
    
                })
            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
    
                let message:string = localStorage.getItem("email") +" has accepted your friend reqeust"
                // api call to notify accepted friend request
                axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/SendGenericNotification`,{
                    "method":"POST",
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data:{ 
                        pushTarget: [email],
                        pushTitle:  "Friend Request Accepted",
                        pushMessage: message,
                        isSilent: false
                    }
                })
                .then(response =>response.data)
                .catch(err => {console.log(err)}) 
    
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
           
        }

        const sendFriendRequest = ()=>{
            setLoading(true)
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
                setLoading(false)
                console.log(response)
                setRequestPending("outgoing")
            })
            .catch(err => {
                setLoading(false)
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
                                <IonCard mode="ios" className="profileCard" style={{"paddingBottom":"2em"}}>
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
                                        {
                                            (requstPending==="non")
                                            &&
                                            <IonButton mode="ios" onClick={sendFriendRequest}>Send Friend Request</IonButton>
                                        }
                                        {
                                            (requstPending==="incoming")
                                            &&
                                            <IonButton mode="ios" disabled={true}>Request Sent</IonButton>
                                        }
                                        {
                                            (requstPending==="outgoing")
                                            &&
                                            <IonButton mode="ios" onClick={confirmRequest}>Accept Friend Request</IonButton>
                                        }
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>
                
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default NotFriendProfile;
