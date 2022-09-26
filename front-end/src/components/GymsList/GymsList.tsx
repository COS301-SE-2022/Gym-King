import { IonItem, IonList, IonAvatar, IonImg, IonLabel, useIonViewDidEnter} from '@ionic/react';
import React, {useState} from 'react'
import axios from "axios";

export type props = {gymsList?:any}

const GymsList: React.FC<props> = (props) =>{

    let objectArray:Object[]=[]
    const [gyms, setGyms] = useState(objectArray)
    useIonViewDidEnter(async()=>{
        let array: any[]=[]
        let gymIDs: any[]=[]
        let gymObjects: any[]=[]
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
            console.log(response)
            array = response.results
        })
        .catch(err => {
            console.log(err)
            
            
        })
        //console.log(array)
        //extract the gymsIDs from the results 
        // eslint-disable-next-line 
        array.map((el)=>{
            gymIDs.push(el.toGym)
        })
        //console.log(gymIDs)
        //get the gym information for each g_id

        // eslint-disable-next-line 
        gymIDs.map(async (gid)=>{
            let gym ={}
            await axios.get(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/${gid}`)
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
                gym = response
            })
            .catch(err => {
                console.log(err)
            })

            gymObjects.push(gym)
        })
        console.log(gymObjects)
        setGyms(gymObjects)
        console.log(gymObjects)
        
    },[])


        const viewGymProfile = () =>{

        }

        return(
            
            <IonList>
                {
                    gyms.map((el:any)=>{
                        return (<IonItem button detail  onClick={viewGymProfile} data-testid="aB" key={el.g_id + Math.random()}>
                                <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                                    <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${el.profile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                </IonAvatar>
                                <IonLabel>{el.gym_name}</IonLabel>
                            </IonItem>)
                    })
                }
            </IonList>  
               
        )
        

}

export default GymsList;

