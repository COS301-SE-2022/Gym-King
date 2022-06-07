import {IonContent, IonPage, IonHeader, IonText, IonCol, IonGrid, IonRow} from '@ionic/react';
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
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                 <ViewBadgeCard BadgeTitle="Push ups" BadgeDesc="Complete 30 pushups in one sitting" BadgeImg={0}></ViewBadgeCard>
                            </IonCol>
                            <IonCol>
                               <ViewBadgeCard BadgeTitle="Push ups" BadgeDesc="Complete 20 pushups in one sitting" BadgeImg={1}></ViewBadgeCard>  </IonCol>
                            <IonCol>
                                <ViewBadgeCard BadgeTitle="Push ups" BadgeDesc="Complete 10 pushups in one sitting" BadgeImg={2}></ViewBadgeCard>
                             </IonCol>
                        </IonRow>

                    </IonGrid>
                    
                    
                   
            </IonContent>
        </IonPage>
    )
        

}

export default ViewBadgePage;