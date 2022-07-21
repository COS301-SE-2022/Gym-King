import { IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import BadgeImage from '../../BadgeImage/BadgeImage';
import './MyBadgeCard.css'

export const MyBadgeCard=(prop:{id:any,name:string,qty:number,badgeEmblem:string,badgeRank:string})=>{
    return(
            <IonCard 
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                >
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                        <BadgeImage BadgeEmblem={prop.badgeEmblem} Badgerank={prop.badgeRank}></BadgeImage>
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {prop.name}
                        </IonCardTitle>
                        <IonCardTitle style={{width:100}}  class='ViewBadgeTitle' className='center ion-text-center'>
                            QTY:{prop.qty}
                        </IonCardTitle>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
        )
        
    
}

export default MyBadgeCard;