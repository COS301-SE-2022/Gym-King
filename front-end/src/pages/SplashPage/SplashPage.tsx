import { IonPage, IonContent, IonImg } from '@ionic/react';
import './splash-screen.css';
//import auth0Client from '../Auth';
import logo from './logo.png';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications, PushNotificationSchema, DeliveredNotifications, ActionPerformed } from '@capacitor/push-notifications';



export const SplashPage: React.FC = () =>
{
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
    // const router = useIonRouter();
    // useIonViewDidEnter(()=>{
    //     getPermissons();
        // setTimeout(() => {
        //     if(localStorage.getItem("email")!=null && localStorage.getItem("password")!=null && localStorage.getItem("usertype")!=null)
        //     {
        //         navigate()
        //     }
        //     else
        //     {
        //         router.push("/Login");

        //     }
        //   }, 3000);

        
        
    //})
    // const navigate=()=>{
    //     let usertype=localStorage.getItem("usertype")
    //     if(usertype==="gym_user")
    //     {
    //         router.push("userMap");
    //     }
    //     else if(usertype==="gym_owner")
    //     {
    //         router.push("GymOwnerPage");
    //     }
    //     else{
    //         router.push("EmployeeHome");
    //     }
    // }
    return (
        <IonPage>
            <IonContent fullscreen className='splash'>
                <IonImg src={logo} className="logo"></IonImg>
            </IonContent>
        </IonPage>
    )
}    


/*function LoadingMessage()
{
    return(
        <div classname="splash-screen"> 
            Wait a moment for the app to load 
            <div classname="loading-dot">.</div>
        </div>
    );
}

/*function SplashPage()
{
    return <div>
        <LoadingMessage />
    </div>
}*/

/*function SplashPage(WrappedComponent)
{
    return class extends Component
    {
        constructor(props)
        {
            super(props);
            this.state = {
                loading: true,
            };
        }
    }

    async componentDidMount()
    {
        try
        {
            await auth0Client.loadSession();
            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 1500)
        }
        catch (err)
        {
            console.log(err);
            this.setState({
                loading: false, 
            });
        }
    }

    render()
    {
        if(this.state.loading)
            return LoadingMessage();
        return <WrappedComponent{...this.props}/>;
    }
};*/


export default SplashPage;
