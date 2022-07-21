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
                let arr=[];
                for(let i=0; i<response.length; i++)
                {
                    let icon=response[i].badgeicon.split("_")
                    console.log(response)
                    arr.push({
                        'b_id':response[i].b_id,
                        'badgename':response[i].badgename,
                        'badgedescription':response[i].badgedescription,
                        'icon':icon
                    })
                }
                setBadges(arr)
            })
            .catch(err => {console.log(err)})
        },[props.gymID])

    return(
        <IonGrid  className="ion-align-items-center">
        <IonRow  className="ion-align-items-center">
        {badges.map(el => 
        
            <IonCol className='center' key={el.b_id}>
                <ViewBadgeCard  BadgeID={el.b_id} BadgeTitle={el.badgename} BadgeDesc={el.badgedescription} Badgerank={el.icon[0]} BadgeEmblem={el.icon[1]}></ViewBadgeCard>
             </IonCol>)}
        </IonRow>

    </IonGrid>
        )
        
    
}

export default GymOwnerViewBadgeGrid;
