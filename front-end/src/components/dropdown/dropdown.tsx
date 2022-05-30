import {IonSelect, IonSelectOption} from '@ionic/react';
import React from 'react'
import './Dropdown.css'
import '../../theme/variables.css'
//creating a type so props can be entered
export type DropDownProps = {list?:Array<string>,  value?:string, parentCallback?:any};
export type DropDownStates = { selectedValue: string };

export class DropDown extends React.Component<DropDownProps, DropDownStates>{



    onChange = (e: any)=>{
        this.props.parentCallback(e.target.value);
        e.preventDefault()
    }
    render(){
        const {list} = this.props;
        return(
                <IonSelect placeholder='Select One' class="dropDown centerComp shadow">
                    {
                        list?.map(el =>{
                            console.log(el);
                            return (<IonSelectOption value={el} key={el}>{el}</IonSelectOption>)
                        })
                    }
                </IonSelect>
        )
        
    }
}

export default DropDown;