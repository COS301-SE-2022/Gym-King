import {IonSelect, IonSelectOption} from '@ionic/react';
import React from 'react'
import './dropdown.css'
import '../../theme/variables.css'
//creating a type so props can be entered
export type DropDownProps = {list?:Array<string>, chosenValue?:any, value?:any};
export type DropDownStates = { selectedValue: string };

export class DropDown extends React.Component<DropDownProps, DropDownStates>{

    onChange = (e: any)=>{
        e.preventDefault()

        this.props.chosenValue(e.target.value);
    }


    render(){
        const {list} = this.props;
        return(
                <IonSelect mode="ios" class="textInput dropDown textInputs shadow" style={{"padding":"5%"}}  onIonChange={this.onChange}>
                    {
                        list?.map(el =>{
                            return (<IonSelectOption  value ={el} key={el} >{el}</IonSelectOption>)
                        })
                    }
                </IonSelect>
        )
        
    }
}

export default DropDown;