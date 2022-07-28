import { IonCol, IonGrid, IonLoading, IonRow, useIonViewDidEnter} from '@ionic/react';
import { useState } from 'react';
import ViewBadgeCard from './ViewBadgeCard/ViewBadgeCard';

export const GymOwnerViewBadgeGrid=(props: {gymID:string})=>{
     
    const [badges, setBadges] = useState(new Array<any>());
    const [loading, setLoading] = useState<boolean>(false);

    
        //GET REQUEST:
        useIonViewDidEnter(()=>
        {
            setLoading(true)
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
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        },[props.gymID])

    return(
        <IonGrid  className="ion-align-items-center">
        <IonRow  className="ion-align-items-center">
        {badges.map(el => 
        
            <IonCol className='center' key={el.b_id}>
                <ViewBadgeCard  BadgeID={el.b_id} BadgeTitle={el.badgename} BadgeDesc={el.badgedescription} Badgerank={el.icon[0]} BadgeEmblem={el.icon[1]}></ViewBadgeCard>
             </IonCol>)}
        </IonRow>

        <IonLoading 
            isOpen={loading}
            message={"Loading"}
            duration={2000}
            spinner={"circles"}
            onDidDismiss={() => setLoading(false)}
            cssClass={"spinner"}
            
        />

    </IonGrid>
        )
        
    
}

export default GymOwnerViewBadgeGrid;
