import { IonContent, IonHeader, IonText, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton } from '@ionic/react';
import React from 'react'
import FileChooser from '../../components/filechooser/FileChooser';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AcceptReject.css';

export class AcceptReject extends React.Component {

    render(){
        return (
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Accept/Reject</IonText>
                    <IonCard>
                        <IonCardHeader>
                            <IonToolbar>
                                <IonTitle>UserName</IonTitle>
                            </IonToolbar>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonText className='Subheading'>Activity</IonText>
                            Core Circuit
                            <IonText className='Subheading'>Proof</IonText>
                            <IonCard>
                            </IonCard>
                        </IonCardContent>
                        <IonButton color="success">Accept</IonButton>
                        <IonButton color="warning">Reject</IonButton>
                    </IonCard>
                </IonContent>
            </IonPage>
        )

    }
}

export default AcceptReject;