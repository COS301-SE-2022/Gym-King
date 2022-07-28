import { IonPage, IonContent, IonImg, useIonViewWillEnter} from '@ionic/react';
import './splash-screen.css';
//import auth0Client from '../Auth';
import logo from './logo.png';



export const SplashPage: React.FC = () =>
{
    useIonViewWillEnter(()=>{
        setTimeout(() => {
            if(localStorage.getItem("email")!=null && localStorage.getItem("password")!=null && localStorage.getItem("usertype")!=null)
            {
                navigate()
            }
            else
            {
                window.location.href="http://localhost:3000/Login"

            }
          }, 3000);

        
        
    })
    const navigate=()=>{
        let usertype=localStorage.getItem("usertype")
        if(usertype==="gym_user")
        {
            window.location.href="http://localhost:3000/userMap"
        }
        else if(usertype==="gym_owner")
        {
            window.location.href="http://localhost:3000/GymOwnerPage"
        }
        else{
            window.location.href="http://localhost:3000/EmployeeHome"
        }
    }
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
