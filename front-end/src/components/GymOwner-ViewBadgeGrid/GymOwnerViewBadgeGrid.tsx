import { IonCol, IonGrid, IonRow} from '@ionic/react';
import { useEffect, useState } from 'react';
import ViewBadgeCard from './ViewBadgeCard/ViewBadgeCard';

export const GymOwnerViewBadgeGrid=(props: {gymID:string})=>{
     
    const [badges, setBadges] = useState(new Array<any>());
    
        //GET REQUEST:
        useEffect(()=>
        {
            
            fetch(`https://gym-king.herokuapp.com/badges/gym/${props.gymID}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                setBadges(response)
            })
            .catch(err => {console.log(err)})
        },[props.gymID])

    return(
        <IonGrid  className="ion-align-items-center">
        <IonRow  className="ion-align-items-center">
        {badges.map(el => 
        
            <IonCol className='center' key={el.b_id}>
                <ViewBadgeCard  BadgeID={el.b_id} BadgeTitle={el.badgename} BadgeDesc={el.badgedescription} BadgeImg={0}></ViewBadgeCard>
             </IonCol>)}
        </IonRow>

    </IonGrid>
        )
        
    
}

export default GymOwnerViewBadgeGrid;
