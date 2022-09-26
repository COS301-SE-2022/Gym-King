import { IonItem, IonList, IonAvatar, IonImg, IonLabel, useIonViewWillEnter} from '@ionic/react';
import React, {useState} from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import GymItem from './GymItem/GymItem';

export type props = {gymsList?:any}

const GymsList: React.FC<props> = (props) =>{

    let history=useHistory()

        

        const viewGymProfile = (el:any) =>{
            sessionStorage.setItem("gid", el.g_id);
            sessionStorage.setItem("gym_brandname", el.gym_brandname);
            sessionStorage.setItem("gym_address", el.gym_address);
            history.push("/GymPage")
        }

        return(
            
            <IonList>
                {
                    props.gymsList?.map((el:any)=>{
                        return (<GymItem gymId={el.toGym}></GymItem>)
                    })
                }
            </IonList>  
               
        )
        

}

export default GymsList;

