import { IonButton, IonCard, IonCardTitle, IonContent, IonGrid,IonPopover, IonRow} from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AR from '../AR/AR';
import BadgeImage from '../BadgeImage/BadgeImage';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number;BadgeRank:string;BadgeEmblem:string })=>{
    let history=useHistory();
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen]  = useState(false);
    return(
        <div>
            <IonCard 
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () =>{setPopoverOpen(true)} }>
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                            <BadgeImage BadgeEmblem={props.BadgeEmblem} Badgerank={props.BadgeRank} idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {props.BadgeTitle}
                            </IonCardTitle>
                    </IonRow>  
                </IonGrid>
            </IonCard>
            <IonPopover  ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
              <IonContent>
                <IonButton className="centerComp" style={{"width":"80%"}} onClick={()=>{sessionStorage.setItem("badgeid",props.BadgeID);setPopoverOpen(false);history.push("/UploadActivity")}}>Apply for badge</IonButton>
                <AR  rank={props.BadgeRank} emblem={props.BadgeEmblem}></AR>
                </IonContent>
          </IonPopover>
        </div>
        )
        
    
}

export default ViewBadgeCard;