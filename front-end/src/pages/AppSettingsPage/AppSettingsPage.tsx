/** 
* @file AppSettingsPage.tsx
* @brief provides the ability to change app settings
*/

import {IonContent, IonText, IonPage, IonHeader} from '@ionic/react';
import SegmentButton from '../../components/segmentButton/segmentButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AppSettingsPage.css';

const AppSettingsPage: React.FC = () =>{
    const setAI_Enabled = (e:string) =>{
            localStorage.setItem("AI_enabled",e)
            console.log("AI",e)
        //setActivityType(e)
    }
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
                    <IonText className='inputHeading leftMargin'>AI:</IonText> <br></br><br></br>
                    <SegmentButton  list={['on', 'off']} val={localStorage.getItem('AI_enabled')} chosenValue={setAI_Enabled}></SegmentButton><br></br><br></br>

                    
                </IonContent>
            </IonPage>
        )
        

}

export default AppSettingsPage;