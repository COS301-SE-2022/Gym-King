import React, { useState } from 'react'
import {IonContent, IonText, IonPage, IonHeader, useIonViewDidEnter, IonLoading} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import GymsList from '../../components/GymsList/GymsList';
import axios from "axios";

const MyGyms: React.FC = () =>{
    const [gyms, setGyms] = useState(new Array<Object>())
    let array: any[]=[]
    let gymIDs: any[]=[]
    let gymObjects: any[]=[]
    const [loading, setLoading] = useState<boolean>(false);


    useIonViewDidEnter(async()=>{

        setLoading(true)
        await axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getGymSubscriptions`,{
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
            setLoading(false)
            console.log(response.results)
            setGyms(response.results)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })



                
    },[gyms, array, gymIDs, gymObjects])

    //=================================================================================================
    //    Render
    //=================================================================================================
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>MY GYMS</IonText>
                    <GymsList gymsList={gyms} ></GymsList>
                    

                    <IonLoading 
                        isOpen={loading}
                        mode="ios"
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default MyGyms;