import { IonList } from '@ionic/react';
import React from 'react'
import GymItem from './GymItem/GymItem';

export type props = {gymsList?:any}

const GymsList: React.FC<props> = (props) =>{


        
        return(
            
            <IonList>
                {
                    props.gymsList?.map((el:any)=>{
                        return (<GymItem gymId={el.toGym} key={el.toGym}></GymItem>)
                    })
                }
            </IonList>  
               
        )
        

}

export default GymsList;

