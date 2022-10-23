import { IonPage, IonContent, IonImg, useIonViewDidEnter } from '@ionic/react';
import './splash-screen.css';
import logo from './logo.png';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications, PushNotificationSchema, DeliveredNotifications, ActionPerformed } from '@capacitor/push-notifications';
import { useHistory } from 'react-router';
import axios from "axios";

export const SplashPage: React.FC = () =>
{
    let history=useHistory()
    PushNotifications.removeAllListeners();
    PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {

            let n = { id: notification.id, title: notification.data.title, body: notification.data.body, type: 'foreground' }
            
            let notificationStorage = localStorage.getItem("notificationStorage")
            if(notificationStorage === null){
                localStorage.setItem("notificationStorage",JSON.stringify([n]))
            }
            else{
                let notifications = JSON.parse(notificationStorage)
                notifications = [...notifications,n]
                localStorage.setItem("notificationStorage",JSON.stringify(notifications))
            }
        
        }
    );
    

    PushNotifications.addListener('pushNotificationActionPerformed',
    (actionPerformed: ActionPerformed) => {
        let n = { id: actionPerformed.notification.id, title: actionPerformed.notification.data.title, body: actionPerformed.notification.data.body, type: 'foreground' }
            
        let notificationStorage = localStorage.getItem("notificationStorage")
        if(notificationStorage === null){
            localStorage.setItem("notificationStorage",JSON.stringify([n]))
        }
        else{
            let notifications = JSON.parse(notificationStorage)
            notifications = [...notifications,n]
            localStorage.setItem("notificationStorage",JSON.stringify(notifications))
        }
    }
);
    PushNotifications.getDeliveredNotifications().then((Delivered:DeliveredNotifications)=>{
        let notificationStorage = localStorage.getItem("notificationStorage")
        
        if(notificationStorage === null){
            notificationStorage = "[]"
        }       
        let notifications = JSON.parse(notificationStorage!)
        for(const n of Delivered.notifications ){
                console.log(n)
                notifications.push(n)
        }        
        localStorage.setItem("notificationStorage",JSON.stringify(notifications))
        PushNotifications.removeAllDeliveredNotifications()
    })

    // eslint-disable-next-line
    const getPermissons = () => {

        Geolocation.checkPermissions().then(
            result => {console.log("permissions granted")},
            err =>{ console.log(err)
                Geolocation.requestPermissions();},
            
        );    
          
    }
    const navigate=()=>{
        let usertype=localStorage.getItem("usertype")
        if(usertype==="gym_user")
        {
            history.push("/userMap")
        }
        else if(usertype==="gym_owner")
        {
            history.push("/GymOwnerPage")
        }
        else if(usertype==="gym_employee"){
            history.push("/EmployeeHome")
        }
        else{

            history.push("/EmployeeHome")
        }
    }
    
    useIonViewDidEnter(()=>{
        getPermissons();
        
        // get the stored user details if any
        var storeEmail = localStorage.getItem("email")
        var storePassword = localStorage.getItem("password")
        var storeUserType = localStorage.getItem("usertype")

        if(storeEmail !=null && storePassword !=null && storeUserType !=null ){
            axios.post(`${process.env["REACT_APP_GYM_KING_API"]}/users/login`, 
                {
                    email: storeEmail,
                    password: storePassword,
                    usertype: storeUserType
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response =>response.data)
                .then(response =>{
                    console.log(response)
                    
                    if(response.success){
                        sessionStorage.setItem("key", response.apikey)

                    localStorage.setItem("email", localStorage.getItem("email")!)
                    localStorage.setItem("username", response.username)
                    localStorage.setItem("password", localStorage.getItem("password")!)
                    localStorage.setItem("usertype",localStorage.getItem("usertype")!)
                    localStorage.setItem("profile_picture", response.profile_picture)
                    localStorage.setItem("pp", response.profile_picture)

                
                    navigate();
                    }else{
                        
                        localStorage.setItem("usertype","")   
                    }

                    navigate();
                })
                .catch(err => {
                    localStorage.setItem("usertype","")  
                    console.log("error while attempting to login in user")
                })
            }

    })
        
        
    return (
        <IonPage>
            <IonContent fullscreen className='splash'>
                <IonImg src={logo} className="logo"></IonImg>
            </IonContent>
        </IonPage>
    )
}    



export default SplashPage;
