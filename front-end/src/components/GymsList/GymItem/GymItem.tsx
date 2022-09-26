import { IonItem, IonAvatar, IonImg, IonLabel} from '@ionic/react';
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';

export type props = {gymId?:any}

const GymsList: React.FC<props> = (props) =>{

    let history=useHistory()

        const [gymBrandName, setGymBrandName] = useState("")
        const [gymName, setGymName] = useState("")
        const [gymAddress, setGymAddress] = useState("")
        const [gymProfile, setGymProfile] = useState("")
        useEffect(()=>{
            //get gym info 
             axios.get(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/${props.gymId}`)
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
                setGymBrandName(response.gym_brandname)
                setGymName(response.gym_name)
                setGymAddress(response.gym_address)
                setGymProfile("")
            })
            .catch(err => {
                console.log(err)
            })
        })
        

        const viewGymProfile = (brandname:string, address:string) =>{
            sessionStorage.setItem("gid", props.gymId);
            sessionStorage.setItem("gym_brandname", brandname);
            sessionStorage.setItem("gym_address", address);
            history.push("/GymPage")
        }

        return(

            <IonItem button detail  onClick={()=>viewGymProfile(gymBrandName, gymAddress)} key={props.gymId+ Math.random()}>
                    <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                        <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${gymProfile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                    </IonAvatar>
                    <IonLabel>{gymName}</IonLabel>
            </IonItem>)
                    
                
        
               
        
        

}

export default GymsList;

