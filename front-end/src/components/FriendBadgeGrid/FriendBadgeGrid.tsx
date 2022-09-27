import { IonCol, IonGrid, IonRow} from '@ionic/react';
import React from 'react';
import MyBadgeCard from '../MyBadgeGrid/MyBadgeCard/MyBadgeCard';


export const FriendBadgeGrid=(prop:{badges:any[]})=>{
   

    return(
        
        <IonGrid>
            <IonRow  className="ion-align-items-center">
                {prop.badges.map(el => 
                    <IonCol className="center" key={el.id}>
                    <MyBadgeCard id={el.b_id.b_id} name={el.b_id.badgename} qty={el.count} badgeEmblem={el.b_id.badgeicon.split('_')[1]} badgeRank={el.b_id.badgeicon.split('_')[0]}></MyBadgeCard>
                    </IonCol>)}
            </IonRow>
        </IonGrid>
        )
        
    
}

export default FriendBadgeGrid;