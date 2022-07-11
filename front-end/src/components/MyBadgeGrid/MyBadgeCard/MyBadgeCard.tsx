import { IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import './MyBadgeCard.css'

export const MyBadgeCard=()=>{
    return(
            <IonCard 
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                >
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                            <img 
                                width="100px" 
                                height="100%"
                                src='#' 
                                alt='badge'
                            />
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    gold running badge
                        </IonCardTitle>
                        <IonCardTitle style={{width:100}}  class='ViewBadgeTitle' className='center ion-text-center'>
                            QTY:3
                        </IonCardTitle>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
        )
        
    
}

export default MyBadgeCard;