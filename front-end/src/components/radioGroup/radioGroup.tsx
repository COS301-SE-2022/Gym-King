import {IonItem, IonLabel, IonRadio, IonRadioGroup} from '@ionic/react';
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

             <IonRadioGroup onIonChange={this.onChange}>
               {
                    list?.map((el:any) =>{
                    return (<IonItem className="" key={el.g_id} mode="ios">
                                <IonLabel >{el.gym_brandname}</IonLabel>
                                <IonRadio slot="start" value={el.g_id} mode="ios" />
                            </IonItem>)
                    
                    })
               }

   
             </IonRadioGroup>

        )
        
    }
}

export default RadioGroup;

