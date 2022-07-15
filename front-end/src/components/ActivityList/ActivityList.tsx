import {IonGrid, IonRow, IonText, IonItem, IonList} from '@ionic/react';
import React from 'react'
import './ActivityList.css' ;

//creating a type so props can be entered

export type props = {activityCategory: string, i1:string, i2:string, i3:string};

export class  ActivityList extends React.Component<props>{
    render(){
        if(this.props.activityCategory === 'cardio'){
            return(
                <IonList>
                    <IonItem >
                        <IonGrid className='centerLeft grid'  >
                            <IonRow className='left topMargin' style={{backgroundColor:'#'}}>
                                <IonText className='Subheading'>Duration:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonText className='textInput' >{this.props.i1}</IonText>
                    </IonItem>
                    <br></br>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Distance:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonText className='textInput' >{this.props.i2}</IonText>
                    </IonItem>
                    <br></br>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Level of Difficulty:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonText className='textInput' >{this.props.i3}</IonText>
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
                        <IonText className='textInput' >{this.props.i1}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Sets:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonText className='textInput' >{this.props.i2}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Reps:</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonText className='textInput' >{this.props.i3}</IonText>
                    </IonItem>
                </IonList>
            )
        }

    }
}

export default ActivityList;