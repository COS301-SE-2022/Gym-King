/** 
* @file AppSettingsPage.tsx
* @brief provides the ability to change app settings
*/

import {IonContent, IonText, IonPage, IonHeader} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AppSettingsPage.css';

const FriendsPage: React.FC = () =>{

    //=================================================================================================
    //    Render
    //=================================================================================================
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

export default FriendsPage;