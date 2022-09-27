import { IonCard, IonCardTitle, IonContent, IonGrid, IonPopover, IonRow} from '@ionic/react';
import { useRef, useState } from 'react';
import AR from '../../AR/AR';
import BadgeImage from '../../BadgeImage/BadgeImage';
import './MyBadgeCard.css'

export const MyBadgeCard=(prop:{id:any,name:string,qty:number,badgeEmblem:string,badgeRank:string})=>{
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen]  = useState(false);
    return(
        <div>
            <IonCard 
                mode="ios"
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={()=>{setPopoverOpen(true)}}
                >
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                        <BadgeImage BadgeEmblem={prop.badgeEmblem} Badgerank={prop.badgeRank}  idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
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
            <IonPopover mode="ios"  ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
              <IonContent >
                <AR  rank={prop.badgeRank} emblem={prop.badgeEmblem}></AR>
            </IonContent>
          </IonPopover>
            </div>
        )
        
    
}

export default MyBadgeCard;