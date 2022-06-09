import {IonContent, IonHeader, IonPage, IonText} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';

import './Leaderboard.css';
import {LeaderboardSwiper} from '../../components/LeaderBoardSwiper/LeaderboardSwiper'

const Leaderboard: React.FC = () =>{
 

    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                <IonText className='PageTitle center'>Leaderboard</IonText>
                <LeaderboardSwiper ></LeaderboardSwiper>  
            </IonContent>
        </IonPage>
    )
        

}

export default Leaderboard;