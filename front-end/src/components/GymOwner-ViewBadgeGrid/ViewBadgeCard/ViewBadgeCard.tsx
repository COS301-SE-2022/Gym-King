import { IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number })=>{
    let badge=require("../../../utils/badges.json")  
    let href="http://localhost:3000/UploadActivity"
    return(
            <IonCard 
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {localStorage.setItem("badgeid",props.BadgeID);window.location.href=href} }>
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                            <img 
                                width="100px" 
                                height="100%"
                                src={badge[props.BadgeImg].Base64} 
                                alt={badge[props.BadgeImg].name}
                            />
                    </IonRow>
                    <IonRow class='BadgeDetails'>
                        <IonCardTitle class='ViewBadgeTitle' className='center ion-text-center'>
                                    {props.BadgeTitle}
                            </IonCardTitle>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
        )
        
    
}

export default ViewBadgeCard;