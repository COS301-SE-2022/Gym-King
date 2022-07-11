import { IonCard, IonCardSubtitle, IonCardTitle} from '@ionic/react';
import './GymCard.css'

export const GymCard=(prop:{id:any,name:string,address:string})=>{
   
    return(
            <IonCard
                color="primary"   
                class="ion-padding"
            >
                  <IonCardTitle>
                    {prop.name}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {prop.address}
                  </IonCardSubtitle>
            </IonCard>
        )
        
    
}

export default GymCard;