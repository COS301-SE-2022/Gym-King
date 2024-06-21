import { IonButton, IonCard, IonCardTitle, IonContent, IonGrid,IonModal, IonRow} from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AR from '../AR/AR';
import BadgeImage from '../BadgeImage/BadgeImage';
import './ViewBadgeCard.css'

export const ViewBadgeCard=(props: { BadgeTitle:String;BadgeDesc?:String;BadgeID:string;BadgeImg:number;BadgeRank:string;BadgeEmblem:string })=>{
    let history=useHistory();

    const gymModal = useRef<HTMLIonModalElement>(null);
    const [isShowingGymModal, setIsShowingGymModal] = useState(false);
    
    return(
        <div>
            <IonCard 
                mode="ios"
                data-testid="viewbadgegrid"
                className="ViewBadgeCard glass"  
                style={{ "height":"fit-content"}} 
                onClick={ () =>{setIsShowingGymModal(true)} }>
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

          <IonModal
                mode="ios"
                ref={gymModal}
                trigger="open-modal"
                isOpen={isShowingGymModal}
                initialBreakpoint={0.25}
                breakpoints={[0.0,0.25, 0.5, 0.75]}
                backdropBreakpoint={0.5}
                
            
                
                onWillDismiss={()=>
                {
                    setIsShowingGymModal(false)
                
                }}

            >
                <IonContent color='secondary' ><br></br>
                    <IonButton mode="ios" className="centerComp" style={{"width":"80%"}} onClick={()=>{sessionStorage.setItem("badgeid",props.BadgeID);setIsShowingGymModal(false);history.push("/UploadActivity")}}>Apply for badge</IonButton>
                    <div onClick={()=>{setIsShowingGymModal(false)}}>
                        <AR  rank={props.BadgeRank} emblem={props.BadgeEmblem}></AR>
                    </div>
                </IonContent>
            </IonModal>
            
        </div>
        )
        
    
}

export default ViewBadgeCard;