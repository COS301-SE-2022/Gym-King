import { IonCol, IonGrid, IonLoading, IonRow, useIonViewWillEnter} from '@ionic/react';
import { useEffect, useState, } from 'react';
import ViewBadgeCard from './ViewBadgeCard/ViewBadgeCard';
import axios from 'axios';

export const GymOwnerViewBadgeGrid=(props: {gymID:string})=>{
     
    const [badges, setBadges] = useState(new Array<any>());
    const [loading, setLoading] = useState<boolean>(false);

    
        //GET REQUEST:
        useEffect(()=>
        {
             axios.get(process.env["REACT_APP_GYM_KING_API"]+`/badges/gym/${props.gymID}`)
            .then(response =>response.data)
            .then(response =>{  
                //console.log(response)
                let arr=[];
                for(let i=0; i<response.length; i++)
                {
                    let icon=response[i].badgeicon.split("_")
                    arr.push({
                        'b_id':response[i].b_id,
                        'badgename':response[i].badgename,
                        'badgedescription':response[i].badgedescription,
                        'icon':icon
                    })
                }
                setBadges(arr)
                
            })
            .catch(err => {
                console.log(err)
            })

        },[props.gymID, badges])
        

    return(
        <IonGrid  className="ion-align-items-center">
        <IonRow  className="ion-align-items-center">
        {badges.map(el => 
        
            <IonCol className='center' key={el.b_id}>
                <ViewBadgeCard  BadgeID={el.b_id} BadgeTitle={el.badgename} BadgeDesc={el.badgedescription} Badgerank={el.icon[0]} BadgeEmblem={el.icon[1]}></ViewBadgeCard>
             </IonCol>)}
        </IonRow>

        <IonLoading 
            mode="ios"
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
