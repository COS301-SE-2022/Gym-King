import { IonActionSheet, IonButton, IonCard, IonContent, IonGrid, IonPopover, IonRow, IonText} from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AR from '../../AR/AR';
import BadgeImage from '../../BadgeImage/BadgeImage';

import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;Badgerank:string,BadgeEmblem:string })=>{
    const history=useHistory()
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen]  = useState(false);
    const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
    
    return(
        <>
            <IonCard 
                id="popover-button"
                mode="ios"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {setShowActionSheet(true)}}>
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                    
                        <BadgeImage BadgeEmblem={props.BadgeEmblem} Badgerank={props.Badgerank} idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonText style={{"marginLeft":"4%"}}  className=' ViewBadgeTitle center ion-text-center'>
                                    {props.BadgeTitle}
                        </IonText>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
            <IonPopover mode="ios"    ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)} showBackdrop={true} translucent={true} >
              <IonContent>
                <IonButton mode="ios" className="centerComp" style={{"width":"80%"}} onClick={()=>{localStorage.setItem("badgeid",props.BadgeID);setPopoverOpen(false);history.push("/EditBadge")}}>Edit Badge</IonButton>
                <AR  rank={props.Badgerank} emblem={props.BadgeEmblem}></AR>
                </IonContent>
          </IonPopover>
          <IonActionSheet
                mode="ios"
               isOpen={showActionSheet}
               onDidDismiss={()=>setShowActionSheet(false)}
               cssClass="my-custom-class"
               
               buttons={[{
                  
                   text: 'Edit Badge',
                   id:'edit-button',
                   handler: () => {
                    localStorage.setItem("badgeid",props.BadgeID);
                    setPopoverOpen(false);
                    sessionStorage.setItem("selectedBE", props.BadgeEmblem)
                    sessionStorage.setItem("selectedBR", props.Badgerank)
                    history.push("/EditBadge")
                   }
                 },{
                   text: 'View AR Model',
                   id: 'viewAR',
                   handler: () => {
                    sessionStorage.setItem("selectedBE", props.BadgeEmblem)
                    sessionStorage.setItem("selectedBR", props.Badgerank)
                    history.push("/ViewAR")
                   }
                 },{ 
                   text: 'Cancel',
                   role: 'cancel',
                   handler: () => {
                     console.log('Cancel clicked');
                   }
                 }]}>
           </IonActionSheet>
            
            </>
        )
        
    
}

export default ViewBadgeCard;