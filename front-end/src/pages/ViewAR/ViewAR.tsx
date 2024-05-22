import {IonContent, IonPage, IonHeader, IonText} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';

import AR from '../../components/AR/AR';

//
const ViewAR: React.FC = () =>{



    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <IonContent fullscreen className='Content' id="main">
                    <IonText className='PageTitle center'>AR Model</IonText>
                    <AR  rank={sessionStorage.getItem("selectedBR")!} emblem={sessionStorage.getItem("selectedBE")!}></AR>

            </IonContent>
        </IonPage>
    )
        

}

export default ViewAR;
