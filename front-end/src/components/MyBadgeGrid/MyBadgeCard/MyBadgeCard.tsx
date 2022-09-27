import { IonCard, IonCardTitle, IonGrid, IonPopover, IonRow} from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AR from '../../AR/AR';
import BadgeImage from '../../BadgeImage/BadgeImage';

import './MyBadgeCard.css'

export const MyBadgeCard=(prop:{id:any,name:string,qty:number,badgeEmblem:string,badgeRank:string})=>{
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen]  = useState(false);
    let history=useHistory();

    const next =()=>{
        if(prop.qty===0)
        {
            sessionStorage.setItem("badgeid",prop.id);
            setPopoverOpen(false);
            history.push("/UploadActivity")
        }
        else
        {
            setPopoverOpen(true)
        }
    }

    return(
        <div>
            <IonCard 
                mode="ios"
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={next}
                >
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                        <BadgeImage BadgeEmblem={prop.badgeEmblem} Badgerank={prop.badgeRank}  idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {prop.name}
                        </IonCardTitle>
                        {
                            prop.qty>0 &&
                            <IonCardTitle style={{width:100}}  class='ViewBadgeTitle' className='center ion-text-center'>
                                QTY:{prop.qty}
                            </IonCardTitle>
                        }
                        
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
            <IonPopover mode="ios"  ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
              
                <AR  rank={prop.badgeRank} emblem={prop.badgeEmblem}></AR>
                        
          </IonPopover>
            </div>
        )
        
    
}

export default MyBadgeCard;