import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React, { useEffect } from 'react';
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
    useEffect(()=>
        {
            var email="u20519517@tuks.co.za"
            fetch(`https://gym-king.herokuapp.com/gyms/owned?email=${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
            })
            .catch(err => {console.log(err)})
        },[])
    return(
        <IonPage >
            <IonHeader>
                <ToolBar menu={false}></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Gyms</IonText>
                    <IonButton routerLink='/AddGym' routerDirection="none" color="warning">ADD GYMS</IonButton>
                    {gymList.map(el=>
                        <GymCard key={el.id} id={el.id} name={el.name} address={el.address}></GymCard>
                    )

                    }
            </IonContent>
            
        </IonPage>
    )
        

}

export default ManageGyms;