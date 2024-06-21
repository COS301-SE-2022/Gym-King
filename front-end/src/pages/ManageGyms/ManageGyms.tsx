/**
 * @file ManageGyms.tsx
 * @brief provides interface for an owner to manage all of his/her gyms
 */
import {IonContent, IonPage, IonHeader, IonText, IonButton, IonLoading, useIonViewDidEnter, IonToast} from '@ionic/react';
import React, {useState } from 'react';
import GymCard from '../../components/GymCard/GymCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './ManageGyms.css';
import axios from "axios";

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
    const [showToast1, setShowToast1] = useState(false);

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
        axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/getGyms`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                email: localStorage.getItem("email"),
                apikey: sessionStorage.getItem("key")

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setLoading(false)
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
            axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/getGyms`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key")
    
                })
            })
            .then(response =>response.data)
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
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Gyms</IonText>
                    <IonButton mode="ios" className='centerComp' routerLink='/AddGym' routerDirection="forward" color="warning">ADD GYM</IonButton><br></br><br></br>
                    
                    {gymList.map((el:any)=>
                        <GymCard key={el.g_id} id={el.g_id} name={el.gym_name} brand={el.gym_brandname} address={el.gym_address} deleteClicked={deleteClicked}></GymCard>
                    )}
                    
                    <IonLoading 
                        mode="ios"
                        isOpen={loading}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                    <IonToast
                        mode="ios"
                        isOpen={showToast1}
                        onDidDismiss={() => setShowToast1(false)}
                        message="Gym deleted."
                        duration={1000}
                        color="success"
                    />
                    <br></br><br></br><br></br>

                    
            </IonContent>
            
        </IonPage>
    )
        

}

export default ManageGyms;
