import {IonContent, IonText, IonPage, IonHeader} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AppSettingsPage.css';

const AppSettingsPage: React.FC = () =>{


        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>App Settings</IonText>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default AppSettingsPage;

/*
<IonCard className="glass">
    <IonCardHeader className="inputHeading">Notifications</IonCardHeader>
    <IonCardContent>
        <IonGrid>
            <IonRow>
                <IonCol size="3">
                    <IonToggle color='tertiary' checked></IonToggle>
                </IonCol>
                <IonCol size="9">
                    <IonText className='Subheading'>New badges are added to my gyms</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="3">
                    <IonToggle color='tertiary' checked></IonToggle>
                </IonCol>
                <IonCol size="9">
                    <IonText className='Subheading'>My badges are accepted</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="3">
                    <IonToggle color='tertiary' checked></IonToggle>
                </IonCol>
                <IonCol size="9">
                    <IonText className='Subheading'>My badges are rejected</IonText>
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonCardContent>
</IonCard>
*/