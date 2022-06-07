import {IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup, IonSegment, IonSegmentButton} from '@ionic/react';
import { list } from 'ionicons/icons';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type RadioGroupProps = {list?:any, chosenValue?:any, val?:any};
export type RadioGroupStates = { selectedValue: string };

export class RadioGroup extends React.Component<RadioGroupProps, RadioGroupStates>{



    onChange = (e: any)=>{
        this.props.chosenValue(e.target.value);
        e.preventDefault()
    }


    render(){
        const {list} = this.props;
        return(
             <IonList>
             <IonRadioGroup onIonChange={this.onChange}>
               {
                    list?.map((el:any) =>{
                    return (<IonItem className="" key={el.g_id}>
                                <IonLabel >{el.gym_brandname}</IonLabel>
                                <IonRadio slot="start" value={el.g_id} />
                            </IonItem>)
                    
                    })
               }

   
             </IonRadioGroup>

           </IonList>
        )
        
    }
}

export default RadioGroup;

