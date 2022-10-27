import { IonCard, IonCardTitle, IonGrid, IonPopover, IonRow, IonText} from '@ionic/react';
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
            console.log(prop.id)
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
                className="ViewBadgeCard"  
                style={{"height":"fit-content"}} 
                onClick={next}
                >
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage centerComp">
                        <BadgeImage BadgeEmblem={prop.badgeEmblem} Badgerank={prop.badgeRank}  idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <br></br>
                    <IonRow className='BadgeDetails centerComp' style={{"width":"80%"}}>
        
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {prop.name}
                        </IonCardTitle>
                        {
                            prop.qty>0 &&
                            <IonText style={{width:100}}  class='ViewBadgeTitle' className='center ion-text-center'>
                                <i>QTY:{prop.qty}</i>
                            </IonText>
                        }
                        
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
            <IonPopover style={{"background":"transparent"}} mode="ios"  ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
              
                <AR  rank={prop.badgeRank} emblem={prop.badgeEmblem}></AR>
                        
          </IonPopover>
            </div>
        )
        
    
}

export default MyBadgeCard;