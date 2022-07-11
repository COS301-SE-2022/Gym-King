import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React from 'react';
import GymCard from '../../components/GymCard/GymCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ManageGyms.css';
const gymList=[
    { id:1,name:'planet fitness 1',address:"123 street"},
    { id:2,name:'planet fitness 2',address:"124 street"},
    { id:3,name:'planet fitness 3',address:"125 street"},
    { id:4,name:'planet fitness 4',address:"126 street"},
]
const ManageGyms: React.FC = () =>{
    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Gyms</IonText>
                   
                    {gymList.map(el=>
                        <GymCard key={el.id} id={el.id} name={el.name} address={el.address}></GymCard>
                    )

                    }
            </IonContent>
            
        </IonPage>
    )
        

}

export default ManageGyms;