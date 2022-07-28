import { IonPage, IonContent, useIonViewWillEnter} from '@ionic/react';
import './splash-screen.css';
import {AndroidPermissions } from '@awesome-cordova-plugins/android-permissions'
//import auth0Client from '../Auth';



export const SplashPage: React.FC = () =>
{

    const getPermissons = async () => {
        console.log("hey")
        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.LOCATION)
    }
    useIonViewWillEnter(getPermissons)

    return (
        <IonPage>
            <IonContent fullscreen className='splash-screen'>
                <div className="loading-dot"> 
                </div> 
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
