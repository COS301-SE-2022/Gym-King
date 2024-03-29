import {IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type SegmentButtonProps = {list?:any, chosenValue?:any, val?:any};
export type SegmentButtonStates = { selectedValue: string };

export class SegmentButton extends React.Component<SegmentButtonProps, SegmentButtonStates>{



    onChange = (e: any)=>{
        this.props.chosenValue(e.target.value);

        e.preventDefault()
    }


    render(){
        const {list} = this.props;
        return(
            <IonSegment mode="ios" value={this.props.val} onIonChange={this.onChange} data-testid="btnSeg" className='centerComp' style={{"width":"80%"}}>
                {
                    list?.map((el:any) =>{
                        return (<IonSegmentButton mode="ios" value={el} key={el}>
                                    <IonLabel>{el}</IonLabel>
                                </IonSegmentButton>)
                        
                    })
                }
            </IonSegment>
        )
        
    }
}

export default SegmentButton;