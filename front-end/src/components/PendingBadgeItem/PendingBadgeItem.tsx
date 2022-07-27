import {IonIcon, IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './PendingBadgeItem.css'
import {image} from 'ionicons/icons';


//creating a type so props can be entered
export type props = {badgeName:string};


export class PendingBadgeItem extends React.Component<props>{

    render(){
        //console.log(this.userId);
        return(
            <IonItem class='btnApproval'>
                <IonIcon icon={image} className='userProfile'></IonIcon>
                <IonLabel>{this.props.badgeName}</IonLabel>
            </IonItem>
        )
        
    }
}

export default PendingBadgeItem;