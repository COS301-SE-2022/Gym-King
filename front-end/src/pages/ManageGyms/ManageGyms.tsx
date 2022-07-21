import {IonContent, IonPage, IonHeader, IonText, IonButton, useIonViewWillEnter, IonLoading} from '@ionic/react';
import React, {useState } from 'react';
import GymCard from '../../components/GymCard/GymCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ManageGyms.css';

const ManageGyms: React.FC = () =>{

    const [gymList,setGymList]=useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);


    useIonViewWillEnter(()=>
        {
            if(sessionStorage.getItem("gymName")!=null)
            {
                sessionStorage.removeItem("gymName")
            }
            if(sessionStorage.getItem("gymAddress")!=null)
            {
                sessionStorage.removeItem("gymAddress")
            }
            if(sessionStorage.getItem("Lat") !=null && sessionStorage.getItem("Long")!=null)
            {
                sessionStorage.removeItem("Lat")
                sessionStorage.removeItem("Long")
            }
            
            let email = localStorage.getItem("email");
            setLoading(true)
            fetch(`https://gym-king.herokuapp.com/gyms/owned/${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                setLoading(false)
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
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
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

                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
            </IonContent>
            
        </IonPage>
    )
        

}

export default ManageGyms;
