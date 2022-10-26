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
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>APP SETTINGS</IonText>
                    <IonText className='inputHeading leftMargin'>Automated Workout Review</IonText> <br></br><br></br>
                    <div className='centerComp' style={{"width":"80%", "fontSize":"80%"}}>
                        <IonText ><i>We have and Artificial Inteligence engine that reviews the proof that you upload for a badge and either accepts or reject this. Turn this off if you would rather have an employee review you.</i></IonText>
                    </div><br></br>
                    <SegmentButton list={['On', 'Off']} val={localStorage.getItem('AI_enabled')} chosenValue={setAI_Enabled}></SegmentButton><br></br><br></br>

                    
                </IonContent>
            </IonPage>
        )
        

}

export default AppSettingsPage;