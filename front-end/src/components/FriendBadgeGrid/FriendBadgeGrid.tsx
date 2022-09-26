import { IonCol, IonGrid, IonRow} from '@ionic/react';
import MyBadgeCard from '../MyBadgeGrid/MyBadgeCard/MyBadgeCard';


export const FriendBadgeGrid=(prop:{badges:any[]})=>{
   

    return(
        
        <IonGrid>
            <IonRow  className="ion-align-items-center">
                {prop.badges.map(el => 
                    <IonCol className="center" key={el.id}>
                    <MyBadgeCard id={el.id} name={el.name} qty={el.qty} badgeEmblem={el.b_id.badgeicon[0]} badgeRank={el.icon[0]}></MyBadgeCard>
                    </IonCol>)}
            </IonRow>
        </IonGrid>
        )
        
    
}

export default FriendBadgeGrid;