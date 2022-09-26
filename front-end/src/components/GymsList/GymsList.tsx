import { IonItem, IonList, IonAvatar, IonImg, IonLabel} from '@ionic/react';
import React from 'react'


export type props = {gymsList?:any}

const GymsList: React.FC<props> = (props) =>{


        const viewGymProfile = () =>{

        }

        return(
            
            <IonList>
                {
                    props.gymsList.map((el:any)=>{
                        return (<IonItem button detail  onClick={viewGymProfile} data-testid="aB" key={el.email + Math.random()}>
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

