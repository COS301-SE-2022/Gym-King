import {IonContent, IonPage, IonHeader, IonText, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonPopover, IonItem, IonCheckbox} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ManageGyms.css';

const ManageGyms: React.FC = () =>{
    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Gyms</IonText>
            </IonContent>
        </IonPage>
    )
        

}

export default ManageGyms;