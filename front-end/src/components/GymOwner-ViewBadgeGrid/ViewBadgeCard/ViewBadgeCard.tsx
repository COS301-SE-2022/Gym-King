import { IonButton, IonCard, IonCardTitle, IonContent, IonGrid, IonPopover, IonRow} from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AR from '../../AR/AR';
import BadgeImage from '../../BadgeImage/BadgeImage';

import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;Badgerank:string,BadgeEmblem:string })=>{
    const history=useHistory()
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen]  = useState(false);
    return(
        <>
            <IonCard 
                id="popover-button"
                mode="ios"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {setPopoverOpen(true)}}>
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                    
                        <BadgeImage BadgeEmblem={props.BadgeEmblem} Badgerank={props.Badgerank} idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {props.BadgeTitle}
                            </IonCardTitle>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
            <IonPopover mode="ios"    ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)} showBackdrop={true} translucent={true} >
              <IonContent>
                <IonButton mode="ios" className="centerComp" style={{"width":"80%"}} onClick={()=>{localStorage.setItem("badgeid",props.BadgeID);setPopoverOpen(false);history.push("/EditBadge")}}>Edit Badge</IonButton>
                <AR  rank={props.Badgerank} emblem={props.BadgeEmblem}></AR>
                </IonContent>
          </IonPopover>
            
            </>
        )
        
    
}

export default ViewBadgeCard;