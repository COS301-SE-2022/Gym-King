import { IonPage, IonContent, IonImg} from '@ionic/react';
import './splash-screen.css';
//import auth0Client from '../Auth';
import logo from './logo.png';

export const SplashPage: React.FC = () =>
{
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
