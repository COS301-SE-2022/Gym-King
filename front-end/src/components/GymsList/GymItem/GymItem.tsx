import { IonItem, IonAvatar, IonImg, IonLabel, IonLoading} from '@ionic/react';
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
        const [loading, setLoading] = useState<boolean>(false);


        useEffect(()=>{
            //get gym info 
             axios.get(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/${props.gymId}`)
            .then(response =>response.data)
            .then(response =>{
                setGymBrandName(response.gym_brandname)
                setGymName(response.gym_name)
                setGymAddress(response.gym_address)
                setGymProfile("")
            })
            .catch(err => {
                console.log(err)
            })

            //get gym brand profile
            axios.get(process.env["REACT_APP_GYM_KING_API"]+`/brands/brand/${gymBrandName}`)
            .then(response =>response.data)
            .then(response =>{
                setGymProfile(response.gym_logo)
            })
            .catch(err => {
                console.log(err)
            })
            
            setLoading(false)
        },[props,gymBrandName])
        

        const viewGymProfile = (brandname:string, address:string) =>{
            sessionStorage.setItem("gid", props.gymId);
            sessionStorage.setItem("gym_name", gymName);
            sessionStorage.setItem("gym_brandname", brandname);
            sessionStorage.setItem("gym_address", address);
            history.push("/GymPage")
        }


        return(
            <>
            <IonItem mode="ios" button detail  onClick={()=>viewGymProfile(gymBrandName, gymAddress)} key={props.gymId}>
                    <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                        <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${gymProfile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                    </IonAvatar>
                    <IonLabel mode="ios">{gymName}</IonLabel>
            </IonItem>
            <IonLoading 
                mode="ios"
                isOpen={loading}
                duration={2000}
                spinner={"circles"}
                onDidDismiss={() => setLoading(false)}
                cssClass={"spinner"}
            />
            </>
            )
                    
                
        
               
        
        

}

export default GymsList;

