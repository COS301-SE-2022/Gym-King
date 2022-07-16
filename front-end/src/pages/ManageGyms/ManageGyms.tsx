import {IonContent, IonPage, IonHeader, IonText, IonButton, useIonViewWillEnter} from '@ionic/react';
import React, {useState } from 'react';
import GymCard from '../../components/GymCard/GymCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ManageGyms.css';

const ManageGyms: React.FC = () =>{
    const [gymList,setGymList]=useState<any>([])
    useIonViewWillEnter(()=>
        {
            var email="u20519517@tuks.co.za"
            fetch(`https://gym-king.herokuapp.com/gyms/owned/${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                let arr=[];
                for(let i=0;i<response.length;i++)
                {
                    arr.push({
                        'id':response[i].g_id,
                        'name':response[i].gym_brandname,
                        'address':response[i].gym_address
                    })
                }
                setGymList(arr)
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
                    <IonButton routerLink='/AddGym' routerDirection="forward" color="warning">ADD GYMS</IonButton>
                    {gymList.map((el:any)=>
                        <GymCard key={el.id} id={el.id} name={el.name} address={el.address}></GymCard>
                    )

                    }
            </IonContent>
            
        </IonPage>
    )
        

}

export default ManageGyms;
