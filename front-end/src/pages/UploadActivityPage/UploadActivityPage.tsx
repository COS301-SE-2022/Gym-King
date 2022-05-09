import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton} from '@ionic/react';
import React from 'react'
import DropDown from '../../components/dropdown/dropdown';
import FileChooser from '../../components/filechooser/FileChooser';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './UploadActivityPage.css';

export class UploadActivityPage extends React.Component{

    render(){
        const activityList = ['Cardio', 'Strength', 'Weights'];
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Upload Activity</IonText>
                    <IonText className='SmallDescription center'>Show us what you've done and earn points!</IonText>

                    <IonGrid className='centerLeft grid'>
                        <IonRow className='left topMargin'>
                            <IonText className='Subheading'>Activity</IonText>
                        </IonRow>
                    </IonGrid>
                    <DropDown list={activityList}></DropDown>

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