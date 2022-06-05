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
                    <ViewBadgeCard BadgeTitle="this works" BadgeDesc="This is a short decription of what the user needs todo"></ViewBadgeCard>
            </IonContent>
        </IonPage>
    )
        

}

export default ViewBadgePage;