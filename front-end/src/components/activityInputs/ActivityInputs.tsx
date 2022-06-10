import {IonGrid, IonInput, IonRow, IonText, IonItem, IonList} from '@ionic/react';
import React from 'react'


//creating a type so props can be entered

export type props = {activityCategory: string, inputs:any};
export type states = {i1:string, i2:string, i3:string}

export class  ActivityInputs extends React.Component<props, states>{
    
    activityStates: states = {i1:'', i2:'', i3:''}
    

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
    

    render(){
        

        if(this.props.activityCategory === 'CARDIO'){
            return(

                <IonList data-testid="ai">
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Duration:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i1' type='text' className='textInput' value={this.activityStates.i1} onIonChange={this.props.inputs && this.handleChange} ></IonInput>
                        
                    </IonItem>
                    <br></br>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Distance:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i2' type='text' className='textInput' value={this.activityStates.i2} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                    </IonItem>
                    <br></br>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Level of Difficulty:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i3' type='text' className='textInput' value={this.activityStates.i3} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                    </IonItem>
                </IonList>
            )
        }
        else{
            return(
                <IonList data-testid="ai">
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Weight:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i1' type='text' className='textInput' value={this.activityStates.i1} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Sets:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i2' type='text' className='textInput' value={this.activityStates.i2} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Reps:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput name='i3' type='text' className='textInput' value={this.activityStates.i3} onIonChange={this.props.inputs && this.handleChange}></IonInput>
                        
                    </IonItem>
                </IonList>
            )
        }

    }
}

export default ActivityInputs;