import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFooter, IonList, IonCard, IonCardContent, IonItem, IonLabel, IonListHeader, IonText, IonButtons, IonMenuButton, IonToast } from '@ionic/react';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';

import axios from "axios";

export default function PushNotificationsContainer() {
    const nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);
    const userEmail = localStorage.getItem("email")
    useEffect(()=>{
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
    },[])
    
    const register = () => {

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                showToast('Push registration success');
                console.log(token.value);
                
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
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
            }
        );
    }

    const showToast = async (msg: string) => {
        setIsToastOpen(true)
        setToastMessage(msg)
    }

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMeassage , setToastMessage] = useState("")

    return (
        <IonPage id='main'>
            <IonContent className="ion-padding">
                <IonListHeader mode="ios" lines="full">
                    <IonLabel>Notifications</IonLabel>
                </IonListHeader>
                {notifications.length !== 0 &&
                    <IonList>

                        {notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                    {notif.type==='foreground' && <p>This data was received in foreground</p>}
                                    {notif.type==='action' && <p>This data was received on tap</p>}
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton color="success" expand="full" onClick={register}>Register for Push</IonButton>
                </IonToolbar>
            </IonFooter>

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
