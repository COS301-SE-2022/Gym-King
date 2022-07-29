import {IonText, IonChip, IonLabel} from '@ionic/react';
import React from 'react'
import './ActivityList.css' ;

//creating a type so props can be entered

export type props = {activityCategory: string, i1:string, i2:string, i3:string};

export class  ActivityList extends React.Component<props>{
    render(){
        if(this.props.activityCategory === 'CARDIO'){
            return(
                <>
                <IonChip className="chip" >
                    <IonLabel style={{"width":"22em"}}> 
                        <IonText   className='Subheading'>Duration:</IonText> 
                        <IonText  className='textInput' >{this.props.i1}</IonText>
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip">
                    <IonLabel style={{"width":"22em"}}> 
                        <IonText className='Subheading'>Distance:</IonText> 
                        <IonText className='textInput' >{this.props.i2}</IonText>
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip">
                    <IonLabel style={{"width":"22em"}}> 
                        <IonText className='Subheading'>Level of Difficulty:</IonText> 
                        <IonText className='textInput' >{this.props.i3}</IonText>
                    </IonLabel>
                </IonChip>
                </>
            )
        }
        else{
            return(
                <>
                <IonChip  className="chip">
                    <IonLabel style={{"width":"22em"}} > 
                        <IonText className='Subheading'>Weight:</IonText> 
                        <IonText className='textInput' >{this.props.i1}</IonText>
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip" >
                    <IonLabel style={{"width":"22em"}}> 
                        <IonText className='Subheading'>Sets:</IonText> 
                        <IonText className='textInput' >{this.props.i2}</IonText>
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip">
                    <IonLabel style={{"width":"22em"}} > 
                        <IonText className='Subheading'>Reps:</IonText> 
                        <IonText className='textInput' >{this.props.i3}</IonText>
                    </IonLabel>
                </IonChip>
                </>
            )
        }

    }
}

export default ActivityList;