import {IonItem, IonLabel} from '@ionic/react';
import React from 'react'
import './PendingBadgeItem.css'
import BadgeImage from '../BadgeImage/BadgeImage';


//creating a type so props can be entered
export type props = {badgeName:string,badgeIcon:string};


export class PendingBadgeItem extends React.Component<props>{

    render(){
        //console.log(this.userId);
        return(
            <IonItem class='btnApproval'>
                <BadgeImage BadgeEmblem={this.props.badgeIcon.split("_")[1]} Badgerank={this.props.badgeIcon.split("_")[0]} idEmblem="pendingEmblem" idRank="pendingRank"></BadgeImage>
                <IonLabel>{this.props.badgeName}</IonLabel>
            </IonItem>
        )
        
    }
}

export default PendingBadgeItem;