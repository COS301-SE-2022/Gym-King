
import {IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText} from '@ionic/react';
import React from "react";
import ToolBar from '../../components/toolbar/Toolbar';
import ViewBadgeCard from '../../components/ViewBadgeCard/ViewBadgeCard';
import './Login.css';



//===============================================================================================================================================//
//DEVICE TYPE FUNCTIONS
//===============================================================================================================================================//


const Login: React.FC = () => {


    return (
        
    
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <IonContent fullscreen className='Content'>
              
                   
            </IonContent>
        </IonPage>
    )
}

export default Login;