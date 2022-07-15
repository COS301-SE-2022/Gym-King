import { IonPage, IonContent} from '@ionic/react';
import './splash-screen.css';
//import auth0Client from '../Auth';

export const SplashPage: React.FC = () =>
{
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
            Wait a moment for the apo to load 
            <div classname="loading-dot">.</div>
        </div>
    );
}

/*function LandingFrame()
{
    const style = {
        "background-image": 'url("Gym_Dumbbells_For_Working_Out_(193383405)")',
        "background-repeat": "no-repeat",
        "background-size": "cover",
        position: "absolute",
        height: "100%",
        width: "100%"
    }

    return <div style={style}></div>
}*/

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
