import { IonActionSheet, IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number })=>{
    let badge=require("../../../utils/badges.json")  
    const history=useHistory()
    const [showActionSheet, setShowActionSheet] = useState(false);
    return(
        <>
            <IonCard 
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {setShowActionSheet(true)}}>
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
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={()=>setShowActionSheet(false)}
                cssClass="my-custom-class"
               
                buttons={[{
                    text: 'View In AR',
                    handler: () => {
                    }
                  },{
                    text: 'Edit Badge',
                    handler: () => {
                        localStorage.setItem("badgeid",props.BadgeID);
                        history.push("/EditBadge")
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