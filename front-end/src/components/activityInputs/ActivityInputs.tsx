/** 
* @file ActivityInputs.tsx
* @brief component that displays activity inputs for the UploadActivity page
*/


import {IonGrid, IonInput, IonRow, IonText} from '@ionic/react';
import React from 'react'
import "./ActivityInputs.css";

//-props, activity category and activity inputs 
export type props = {activityCategory: string, inputs:any};
//-states, activity input values 
export type states = {i1:string, i2:string, i3:string}

/** 
  * @param ? props, states
  * @return ? - ActivityInputs component
*/
export class  ActivityInputs extends React.Component<props, states>{

      
    //-activityStates hook, hook that sets the input activity states 
    activityStates: states = {i1:'', i2:'', i3:''}
    
    //=================================================================================================
    //    FUNCTIONS
    //=================================================================================================

    /** 
     * @brief ! - sets the input values entered when submitted 
     * @param ? - event, any
     * @result ? - input activitied are updated 
    */
    
    handleChange = (e:any) =>{
        let input = e.target.name;
        let value = e.target.value;
        if(input === 'i1')
            this.activityStates.i1=value;
        else if(input === 'i2')
            this.activityStates.i2=value;
        else if (input==='i3')
            this.activityStates.i3=value;
    }
    
    //=================================================================================================
    //    Render
    //=================================================================================================
    render(){
        
        if(this.props.activityCategory === 'CARDIO'){
            return(

                <>
                    <IonGrid className=' grid'>
                        <IonRow className='left topMargin'>
                            <IonText className='Subheading'>Duration:</IonText>
                        </IonRow>
                        <IonRow>
                            <IonInput name='i1' type='text' className='textInput width80 ' value={this.activityStates.i1} onIonChange={this.props.inputs && this.handleChange} ></IonInput>
                        </IonRow>

                        <IonRow className='left topMargin'>
                            <IonText className='Subheading'>Distance:</IonText>
                        </IonRow>
                        <IonRow>
                            <IonInput name='i2' type='text' className='textInput width80' value={this.activityStates.i2} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                        </IonRow>
                        <IonRow className='left topMargin'>
                            <IonText className='Subheading'>Level of Difficulty:</IonText>
                        </IonRow>
                        <IonRow>
                            <IonInput name='i3' type='text' className='textInput width80' value={this.activityStates.i3} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                        </IonRow>
                    </IonGrid>

                </>
            )
        }
        else{
            return(
                <>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Weight:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i1' type='text' className='textInput width80 marginLeft' value={this.activityStates.i1} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Sets:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i2' type='text' className='textInput width80 marginLeft' value={this.activityStates.i2} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Reps:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i3' type='text' className='textInput width80 marginLeft' value={this.activityStates.i3} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                        
                </>
            )
        }

    }
}

export default ActivityInputs;