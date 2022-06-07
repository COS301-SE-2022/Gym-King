import {IonContent, IonPage, IonHeader, IonText} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {ViewBadgeCard}from '../../components/ViewBadgeCard/ViewBadgeCard'
import './ViewBadgePage.css';


const ViewBadgePage: React.FC = () =>{

    return(
        <IonPage>
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>View Badges</IonText>
                    <ViewBadgeCard BadgeTitle="Push ups" BadgeDesc="Complete 30 pushups in one sitting" BadgeImg={0}></ViewBadgeCard>
                    <ViewBadgeCard BadgeTitle="Push ups" BadgeDesc="Complete 20 pushups in one sitting" BadgeImg={1}></ViewBadgeCard>
                    <ViewBadgeCard BadgeTitle="Push ups" BadgeDesc="Complete 10 pushups in one sitting" BadgeImg={2}></ViewBadgeCard>
            </IonContent>
        </IonPage>
    )
        

}

export default ViewBadgePage;