import React from 'react'
import {IonContent, IonText, IonPage, IonHeader} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import GymsList from '../../components/GymsList/GymsList';

const MyGyms: React.FC = () =>{


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
                    <IonText className='PageTitle center'>My Gyms</IonText>
                    <GymsList ></GymsList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default MyGyms;