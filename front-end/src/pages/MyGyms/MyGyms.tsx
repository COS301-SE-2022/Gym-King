import React from 'react'
import {IonContent, IonText, IonPage, IonHeader} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import GymsList from '../../components/GymsList/GymsList';

const MyGyms: React.FC = () =>{

    let gymsList=[{"gym_name":"Virgin Active Menlyn"},{"gym_name":"Virgin Active Parkview"}]

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
                    <GymsList gymsList={gymsList}></GymsList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default MyGyms;