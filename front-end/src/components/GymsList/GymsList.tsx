import { IonList } from '@ionic/react';
import React from 'react'
import GymItem from './GymItem/GymItem';

export type props = {gymsList?:any}

const GymsList: React.FC<props> = (props) =>{


        
        return(
            
            <IonList mode="ios" className='transparentBack'>
                {
                    props.gymsList?.map((el:any)=>{
                        return (<GymItem gymId={el.togym} key={el.togym}></GymItem>)
                    })
                }
            </IonList>  
               
        )
        

}

export default GymsList;

