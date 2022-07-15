import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React from 'react';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './GymOwnerPage.css';

const GymOwnerPage: React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className ='Content'>
                <IonText className='PageTitle center'>Owner Page</IonText>
                <IonButton routerLink='/ManageGyms' routerDirection="none" color="warning">Manage Gyms</IonButton>
                <br></br>
                <IonButton routerLink="/GymOwner-ViewBadge" routerDirection="none" color="warning">Manage Badges</IonButton>
                <br></br>
                <IonButton routerLink="/ManageEmployee" routerDirection="none" color="warning" >Manage Employees</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default GymOwnerPage;
