import { IonActionSheet, IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BadgeImage from '../BadgeImage/BadgeImage';
import './ViewBadgeCard.css'
import { useHistory } from 'react-router-dom';

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number;BadgeRank:string;BadgeEmblem:string })=>{
    let history=useHistory();
    const [showActionSheet, setShowActionSheet] = useState(false);
    return(
        <div>
            <IonCard 
                data-testid="viewbadgegrid"
                color="primary" 
                class="ViewBadgeCard"  
                style={{ padding : 0}} 
                onClick={ () => {setShowActionSheet(true)}}>
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage">
                            <BadgeImage BadgeEmblem={props.BadgeEmblem} Badgerank={props.BadgeRank}></BadgeImage>
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
                    text: 'Apply for badge',
                    handler: () => {
                        localStorage.setItem("badgeid",props.BadgeID);
                        history.push("/UploadActivity")
                    }
                  },{ 
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  }]}>
            </IonActionSheet>
        </div>
        )
        
    
}

export default ViewBadgeCard;