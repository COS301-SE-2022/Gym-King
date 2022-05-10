import {IonGrid, IonInput, IonRow, IonText, IonItem, IonList} from '@ionic/react';
import React from 'react'


//creating a type so props can be entered

export type props = {activityCategory: string};

export class  ActivityInputs extends React.Component<props>{
    render(){
        if(this.props.activityCategory === 'cardio'){
            return(
                <IonList>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Duration:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput type='text' className='textInput'></IonInput>
                    </IonItem>
                    <br></br>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Distance:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput type='text' className='textInput'></IonInput>
                    </IonItem>
                    <br></br>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Level of Difficulty:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput type='text' className='textInput' ></IonInput>
                    </IonItem>
                </IonList>
            )
        }
        else{
            return(
                <IonList>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Weight:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput type='text' className='textInput'></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Sets:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput type='text' className='textInput' ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Reps:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonInput type='text' className='textInput'></IonInput>
                    </IonItem>
                </IonList>
            )
        }

    }
}

export default ActivityInputs;