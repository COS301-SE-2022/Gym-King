import { IonActionSheet, IonCard, IonCardTitle, IonGrid, IonRow} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BadgeImage from '../BadgeImage/BadgeImage';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number;BadgeRank:string;BadgeEmblem:string })=>{
    let history=useHistory();


    const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

    
    return(
        <div>
            <IonCard 
                mode="ios"
                data-testid="viewbadgegrid"
                className="ViewBadgeCard glass"  
                style={{ "height":"fit-content"}} 
                onClick={ () =>{setShowActionSheet(true)} }>
                <IonGrid className="ViewBadgeGrid " >
                    <IonRow class="ViewBadgeImage centerComp">
                            <BadgeImage BadgeEmblem={props.BadgeEmblem} Badgerank={props.BadgeRank} idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <br></br>
                    <IonRow class='BadgeDetails centerComp' style={{"width":"80%"}} >
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {props.BadgeTitle}
                            </IonCardTitle>
                    </IonRow>  
                </IonGrid>
            </IonCard>



            <IonActionSheet
                mode="ios"
               isOpen={showActionSheet}
               onDidDismiss={()=>setShowActionSheet(false)}
               cssClass="my-custom-class"
               
               buttons={[{
                  
                   text: 'Apply for badge',
                   id:'btnApply',
                   handler: () => {
                        sessionStorage.setItem("badgeid",props.BadgeID);
                        history.push("/UploadActivity")
                   }
                 },{
                   text: 'View AR Model',
                   id: 'viewAR',
                   handler: () => {
                    sessionStorage.setItem("selectedBE", props.BadgeEmblem)
                    sessionStorage.setItem("selectedBR", props.BadgeRank)
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
            
        </div>
        )
        
    
}

export default ViewBadgeCard;