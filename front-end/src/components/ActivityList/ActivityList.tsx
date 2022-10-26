/** 
* @file ActivityList.tsx
* @brief component that displays activity values for the Accept/Reject card
*/


import {IonText, IonChip, IonLabel, IonCol, IonGrid} from '@ionic/react';
import React from 'react'
import './ActivityList.css' ;

//-props, activity category and activity inputs 
export type props = {activityCategory: string, i1:string, i2:string, i3:string};

/** 
  * @param ? props
  * @return ? - ActivityList component
*/
export class  ActivityList extends React.Component<props>{

    //=================================================================================================
    //    Render
    //=================================================================================================
    render(){
        if(this.props.activityCategory === 'CARDIO'){
            return(
                <>
                <IonChip mode="ios" className="chip" >
                    <IonLabel style={{"width":"22em"}}> 
                        <IonGrid>
                            <IonCol><IonText   className='Subheading'>Duration:</IonText> </IonCol>
                            <IonCol><IonText  className='textInput' >{this.props.i1}</IonText></IonCol>
                        </IonGrid>
                        
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip" mode="ios">
                    <IonLabel style={{"width":"22em"}}> 
                        <IonGrid>
                            <IonCol><IonText className='Subheading'>Distance:</IonText>  </IonCol>
                            <IonCol><IonText className='textInput' >{this.props.i2}</IonText></IonCol>
                        </IonGrid>
                
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip" mode="ios">
                    <IonLabel style={{"width":"22em"}}> 
                        <IonGrid>
                            <IonCol><IonText className='Subheading'>Level of Difficulty:</IonText>  </IonCol>
                            <IonCol><IonText className='textInput' >{this.props.i3}</IonText></IonCol>
                        </IonGrid>
                        
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
                        <IonGrid>
                            <IonCol><IonText className='Subheading'>Weight:</IonText>  </IonCol>
                            <IonCol><IonText className='textInput' >{this.props.i1}</IonText></IonCol>
                        </IonGrid> 
                         
                        
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip" >
                    <IonLabel style={{"width":"22em"}}> 
                        <IonGrid>
                            <IonCol><IonText className='Subheading'>Sets:</IonText>  </IonCol>
                            <IonCol><IonText className='textInput' >{this.props.i2}</IonText></IonCol>
                        </IonGrid> 
                        
                        
                    </IonLabel>
                </IonChip> <br></br>
                <IonChip className="chip">
                    <IonLabel style={{"width":"22em"}} > 
                        <IonGrid>
                            <IonCol><IonText className='Subheading'>Reps:</IonText>  </IonCol>
                            <IonCol><IonText className='textInput' >{this.props.i3}</IonText></IonCol>
                        </IonGrid> 
                        
                        
                    </IonLabel>
                </IonChip>
                </>
            )
        }

    }
}

export default ActivityList;