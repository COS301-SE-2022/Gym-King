import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonItem, IonLabel, IonText, IonToast, IonList, IonItemSliding, IonItemOption, IonItemOptions, IonFooter, IonButton, IonToolbar } from '@ionic/react';
import { PushNotifications, Token} from '@capacitor/push-notifications';

import axios from "axios";
import ToolBar from '../toolbar/Toolbar';

const PushNotificationsContainer: React.FC = () => {
    let nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);

    const clearNotification = (key:string) =>{
        let notificationStorage = localStorage.getItem("notificationStorage")
        if(notificationStorage !== null){
            let JSONnotifStore = JSON.parse(notificationStorage)
            let out = []
            
            for( const n of JSONnotifStore){
                if(!(n.id===key)){
                    out.push(n)
                }
            }

            setnotifications(out)
            localStorage.setItem("notificationStorage",JSON.stringify(out))
        
        }
    }

    const clearAllNotifications = () =>{
        localStorage.setItem("notificationStorage","[]")
        setnotifications(nullEntry)
    }
    const validteRegister = () => {
        PushNotifications.checkPermissions().then((res) => {
            if (res.receive !== 'granted') {
              PushNotifications.requestPermissions().then((res) => {
                if (res.receive === 'denied') {
                  showToast('Push Notification permission denied');
                }
                else {
                  showToast('Push Notification permission granted');
                  register();
                }
              });
            }
            else {
              register();
            }
          });
    }
    const userEmail = localStorage.getItem("email")

    validteRegister()

    useEffect(() => {
        let notificationStorage = localStorage.getItem("notificationStorage")
        if(notificationStorage !== null){
            setnotifications(JSON.parse(notificationStorage))
        }
    },[setnotifications])
    const refresh = 2500 
    useEffect(() => {

        const interval = setInterval(() => {
            console.log("push notification page has refreshed")
            let notificationStorage = localStorage.getItem("notificationStorage")
            if(notificationStorage !== null){
                setnotifications(JSON.parse(notificationStorage))
            }
        }, refresh);
        
        return () => 
        {
            clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }
    },[setnotifications])
    
    const register = () => {
        const hasRegistered = sessionStorage.getItem("hasRegistered");
        if(hasRegistered==null || hasRegistered!=="true"){
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();

            // On success, we should be able to receive notifications
            PushNotifications.addListener('registration',
                (token: Token) => {
                    
                    // Post the push key to the API

                    axios.put(`${process.env["REACT_APP_GYM_KING_API"]}/users/user/pushToken`, 
                    {
                        email: userEmail,
                        token: token.value,
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })            
                    .then(response =>response.data)
                    .then(response =>{
                        if(response.success){
                            console.log(response)
                            showToast('Push registration success');
                        }else{
                            
                            console.log(response.success)
                            console.log(response.results)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            );

            // Some issue with our setup and push will not work
            PushNotifications.addListener('registrationError',
                (error: any) => {
                    showToast('Error on registration: ' + JSON.stringify(error));
                }
            );
            sessionStorage.setItem("hasRegistered","true")
        }
        

    }

    const showToast = async (msg: string) => {
        setIsToastOpen(true)
        setToastMessage(msg)
    }

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMeassage , setToastMessage] = useState("")

    return (
        <IonPage color='#220FE' >           
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
            <IonContent >

                <IonText className='PageTitle center' style={{"fontSize":"180%"}}>NOTIFICATIONS</IonText>
                <IonButton mode="ios" className='centerComp width80' color="medium" onClick={clearAllNotifications}>Clear All</IonButton>

                {notifications.length !== 0 &&
                    <IonList mode="ios" className='transparentBack'>
  
                    {notifications.map((notif: any) =>
                        <IonItemSliding >
                            <IonItem detail key={notif.id} mode="ios" className='transparentBack'>
                                <IonLabel>                          
                                        <h3>{notif.title}</h3>
                                        <p>{notif.body}</p>
                                </IonLabel>
                            </IonItem>

                            <IonItemOptions >
                                <IonItemOption 
                                    mode="ios"
                                    color="danger"
                                    onClick={() =>clearNotification(notif.id)}>
                                        Clear
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding> 
                    )}
                    </IonList>
                }
            </IonContent>
            <IonToast
                mode="ios"
                isOpen={isToastOpen}
                onDidDismiss={() => setIsToastOpen(false)}
                message={toastMeassage}
                duration={1000}
                color="danger"
                />
        </IonPage >
    )
}

export default PushNotificationsContainer;