import { IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import './ViewBadgeCard.css'
import { useHistory } from 'react-router-dom';


export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number })=>
{
    let badge=require("../../utils/badges.json")  
    let history=useHistory()
    return(
            <IonCard 
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {
                    localStorage.setItem("badgeid",props.BadgeID);
                    history.push("/UploadActivity");
                    } }>
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
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {props.BadgeTitle}
                            </IonCardTitle>
                    </IonRow>
                            
                </IonGrid>
            </IonCard>
        )
        
    
}

export default ViewBadgeCard;