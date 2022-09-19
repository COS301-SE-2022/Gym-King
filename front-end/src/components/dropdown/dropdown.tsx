import {IonSelect, IonSelectOption} from '@ionic/react';
import React from 'react'
import './dropdown.css'
import '../../theme/variables.css'
//creating a type so props can be entered
export type DropDownProps = {list?:Array<string>, chosenValue?:any, value?:any};
export type DropDownStates = { selectedValue: string };

export class DropDown extends React.Component<DropDownProps, DropDownStates>{



    onChange = (e: any)=>{
        this.props.chosenValue(e.target.value);
        e.preventDefault()
    }


    render(){
        const {list} = this.props;
        return(
                <IonSelect class="textInput dropDown textInputs shadow" value={this.props.value}   onIonChange={this.onChange}>
                    {
                        list?.map(el =>{
                            return (<IonSelectOption value={el} key={el} >{el}</IonSelectOption>)
                        })
                    }
                </IonSelect>
        )
        
    }
}

export default DropDown;