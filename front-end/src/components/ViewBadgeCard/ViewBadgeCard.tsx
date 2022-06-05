import {IonButton, IonCard, IonCardTitle, IonGrid, IonRow, IonCol} from '@ionic/react';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID?:String;BadgeImg?:String })=>{
        return(
            <IonCard style={{ padding : 0}} >
                <IonGrid style={{margin:0}} class="ViewBadgeGrid" className="grid">
                    <IonRow class="ViewBadgeRow" className="left">      
                        <IonCol size="3" class="ColBadgeImg">
                            <img 
                                width="100%" 
                                height="100%"
                                src="https://www.pngfind.com/pngs/m/156-1560504_golden-medal-png-clipart-image-medalja-png-transparent.png" 
                                alt="badge"
                            />
                        </IonCol> 
                        <IonCol size="9"class='ColBadgeDetails'>
                            <IonRow class='BadgeDetails'>
                                <IonCardTitle>
                                    {props.BadgeTitle}
                                </IonCardTitle>
                            </IonRow>
                            <IonRow class='BadgeDetails'>
                                {props.BadgeDesc}
                            </IonRow>
                             <IonRow class='BadgeDetails' className="ion-justify-content-end">
                                <IonButton href="http://localhost:300/UploadActivity?id=1"class="ApplyButton" size="small" routerDirection='forward'>
                                    Apply
                                </IonButton>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCard>
        )
        
    
}

export default ViewBadgeCard;