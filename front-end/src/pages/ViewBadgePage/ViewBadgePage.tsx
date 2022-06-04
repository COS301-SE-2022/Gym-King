import {IonContent, IonPage, IonHeader} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ViewBadgePage.css';


const ViewBadgePage: React.FC = () =>{

    return(
        <IonPage>
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent>
            </IonContent>
        </IonPage>
    )
        

}

export default ViewBadgePage;