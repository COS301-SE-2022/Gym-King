import {IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText} from '@ionic/react';
import React from 'react'
import './AcceptRejectCard.css'
import {personCircleOutline} from 'ionicons/icons';
import {documentOutline} from 'ionicons/icons';
import ActivityList from '../ActivityList/ActivityList';

//creating a type so props can be entered
export type props = {userID:number, username:string, badge:any};


export class AcceptRejectCard extends React.Component<props>{
    render(){
        return(
            <IonCard>
                 <IonItem>
                    <IonIcon icon={personCircleOutline} className='userProfile'></IonIcon>
                    <IonText className='username'>{this.props.username}</IonText>
                </IonItem>
                <IonCardContent>
                    <IonText className='Subheading'>
                        Badge:
                    </IonText><br></br>
                    <IonText className='txtBadge'>
                        {this.props.badge.name}
                    </IonText>
                    <br></br>
                    <ActivityList  activityCategory={this.props.badge.activityCategory} i1={this.props.badge.input1} i2={this.props.badge.input2} i3={this.props.badge.input3}></ActivityList>
                
                    <br></br>
                    <IonText className='Subheading'>Proof:</IonText>
                    <IonCard className='justify'>
                        <IonCardContent >
                            <IonIcon icon={documentOutline} className='imgIcon'></IonIcon>     
                        </IonCardContent>
                    </IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton color='primary'>Accept</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color='secondary'>Reject</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        )
        
    }
}

export default AcceptRejectCard;



