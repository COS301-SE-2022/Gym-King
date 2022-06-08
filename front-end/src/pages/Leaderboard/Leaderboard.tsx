import {IonContent, IonHeader, IonPage} from '@ionic/react';
import React from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';

import './Leaderboard.css';


const Leaderboard: React.FC = () =>{
 

    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
           
            </IonContent>
        </IonPage>
    )
        

}

export default Leaderboard;