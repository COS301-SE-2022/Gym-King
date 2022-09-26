import React, {useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, useIonViewWillEnter} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import GymsList from '../../components/GymsList/GymsList';
import axios from "axios";

const MyGyms: React.FC = () =>{

    const [gyms, setGyms] = useState([])
    useIonViewWillEnter(()=>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getGymSubscriptions`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                fromEmail: localStorage.getItem("email"),

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setGyms(response.results)
        })
        .catch(err => {
            console.log(err)
            
        })

    },[])
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
                    <IonText className='PageTitle center'>My Gyms</IonText>
                    <GymsList gymsList={gyms}></GymsList>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default MyGyms;