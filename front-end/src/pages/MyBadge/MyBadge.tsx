import {IonContent, IonPage, IonHeader, IonText} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './MyBadge';


const MyBadge: React.FC = () =>{
    
    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Badges</IonText>
            </IonContent>
        </IonPage>
    )
        

}

export default MyBadge;