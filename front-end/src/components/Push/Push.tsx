import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonItem, IonLabel, IonText, IonToast, IonList } from '@ionic/react';
import { PushNotifications, Token} from '@capacitor/push-notifications';

import axios from "axios";
import ToolBar from '../toolbar/Toolbar';

const PushNotificationsContainer: React.FC = () => {
    let nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);

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
    useEffect(()=>{
        validteRegister()

        let notificationStorage = localStorage.getItem("notificationStorage")
        if(notificationStorage !== null){
        setnotifications(JSON.parse(notificationStorage))
        localStorage.setItem("notificationStorage","[]")
        }

    },[validteRegister()])
    
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

                <IonText className='PageTitle center'>My Notifications</IonText>
                {notifications.length !== 0 &&
                    <IonList>

                        {notifications.map((notif: any) =>
                            <IonItem detail key={notif.id}>
                                <IonLabel>                          
                                        <h3>{notif.title}</h3>
                                        <p>{notif.body}</p>
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
            </IonContent>


            <IonToast
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