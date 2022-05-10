import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonIcon} from '@ionic/react';
import React from 'react'
import FileChooser from '../../components/filechooser/FileChooser';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {shieldOutline} from 'ionicons/icons';
import './UploadActivityPage.css';
import {ActivityInputs} from '../../components/activityInputs/ActivityInputs';
export type UploadActivityStates = {act?:any}

export class UploadActivityPage extends React.Component<UploadActivityStates>{

    state= {activity:'none'};
    
    //fake generic badge for testing 
    badge1 = {
        name:'Cycling Champ', 
        description: 'Cycle 10km in 15 minutes to earn this badge!', 
        activityCategory:'cardio',
        activityType:'cycling',
        input1:'00:14:45',
        input2:'10km',
        input3:'4'
    };

    /*
        CARDIO:
            input1: duration
            input2: distance
            input#: level of difficulty

        STRENGTH:
            input1: weight
            input2: sets
            input3: reps
    */
    
    render(){
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonIcon icon={shieldOutline} className='badge center shadow'></IonIcon>
                    <IonText className='PageTitle center'>{this.badge1.name}</IonText>
                    <IonText className='SmallDescription center'>{this.badge1.description}</IonText> <br></br>
                    <IonText className='inputHeading'>Enter your activity details:</IonText>
                    <ActivityInputs activityCategory={this.badge1.activityCategory}></ActivityInputs> <br></br>
            
                    <IonGrid className='centerLeft grid'>
                        <IonRow className='left topMargin'>
                            <IonText className='Subheading'>Proof</IonText>
                        </IonRow>
                    </IonGrid>
                    <FileChooser numFiles={0}></FileChooser>

                    <IonButton class="btnSubmit">SUBMIT</IonButton>
                </IonContent>
            </IonPage>
        )
        
    }
}

export default UploadActivityPage;