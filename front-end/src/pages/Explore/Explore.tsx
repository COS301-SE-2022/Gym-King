import React from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonSearchbar} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';

const Explore: React.FC = () =>{

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
                    <IonText className='PageTitle center'>Explore</IonText>

                    <IonText className='inputHeading'>Find Friends</IonText>
                    <IonSearchbar></IonSearchbar>
                    <br></br><br></br>

                    <IonText className='inputHeading'>Find Gyms</IonText>
                    <IonSearchbar></IonSearchbar>
                    <br></br><br></br>

                    <IonText className='inputHeading'>Suggested Badges</IonText>

                    
                </IonContent>
            </IonPage>
        )
        

}

export default Explore;