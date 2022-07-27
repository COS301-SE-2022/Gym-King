/**
 * @file ManageGyms.tsx
 * @brief provides interface for an owner to manage all of his/her gyms
 */
import {IonContent, IonPage, IonHeader, IonText, IonButton, useIonViewWillEnter, IonLoading, useIonViewDidEnter} from '@ionic/react';
import React, {useState } from 'react';
import GymCard from '../../components/GymCard/GymCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ManageGyms.css';
/**
 * @returns ManageGyms pages
 */
const ManageGyms: React.FC = () =>{
//=================================================================================================
//    VARIABLES & HOOKS
//=================================================================================================
    //- gymList hook, stores list of gyms a gym owner 
    const [gymList,setGymList]=useState<any>([{'id':"1",'name':"",'address':""}])
    //-loading hook {boolean} determines when loading icon is shown
    const [loading, setLoading] = useState<boolean>(false);
    let email = localStorage.getItem("email");

    useIonViewDidEnter(()=>
    {
        if(sessionStorage.getItem("gid")!=null)
        {
            sessionStorage.removeItem("gid")
        }
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

        
        setLoading(true)
        fetch(`https://gym-king.herokuapp.com/gyms/owned/${email}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            setLoading(false)/*
            let arr=[];
            for(let i=0;i<response.length;i++)
            {
                arr.push({
                    'id':response[i].g_id,
                    'name':response[i].gym_brandname,
                    'address':response[i].gym_address
                })
            }*/
            setGymList(response)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    })
    /**
     * deleteClicked function
     * @brief calls fetch gyms after delete is called 
     */
        const deleteClicked= () => {
            setLoading(true)
            fetch(`https://gym-king.herokuapp.com/gyms/owned/${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                setLoading(false)
                setGymList(response)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
    

    return(
        <IonPage >
            <IonHeader>
                <ToolBar menu={false}></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Gyms</IonText>
                    <IonButton className='centerComp' routerLink='/AddGym' routerDirection="forward" color="warning">ADD GYM</IonButton><br></br><br></br>
                    {gymList.map((el:any)=>
                        <GymCard key={el.g_id} id={el.g_id} name={el.gym_brandname} address={el.gym_address} deleteClicked={deleteClicked}></GymCard>
                    )}
                    
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                    <br></br><br></br><br></br>
            </IonContent>
            
        </IonPage>
    )
        

}

export default ManageGyms;
