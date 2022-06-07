import { IonCard, IonCardTitle, IonGrid, IonRow, IonCol} from '@ionic/react';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID?:String;BadgeImg:number })=>{
    let badge=require("../../utils/badges.json")  
    let href="http://localhost:3000/home"
    return(
            <IonCard 
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {window.location.href=href} }>
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
                        <IonCardTitle>
                                    {props.BadgeTitle}
                            </IonCardTitle>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
        )
        
    
}

export default ViewBadgeCard;