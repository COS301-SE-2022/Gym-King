import { IonCard, IonCardTitle, IonContent, IonGrid, IonModal, IonRow, IonText} from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AR from '../../AR/AR';
import BadgeImage from '../../BadgeImage/BadgeImage';

import './MyBadgeCard.css'

export const MyBadgeCard=(prop:{id:any,name:string,qty:number,badgeEmblem:string,badgeRank:string})=>{
    let history=useHistory();
    const gymModal = useRef<HTMLIonModalElement>(null);
    const [isShowingGymModal, setIsShowingGymModal] = useState(false);

    const next =()=>{
        if(prop.qty===0)
        {
            console.log(prop.id)
            sessionStorage.setItem("badgeid",prop.id);
            setIsShowingGymModal(false);
            history.push("/UploadActivity")
        }
        else
        {
            
            setIsShowingGymModal(true)
        }
    }

    return(
        <div>
            <IonCard 
                mode="ios"
                data-testid="viewbadgegrid"
                className="ViewBadgeCard"  
                style={{"height":"fit-content"}} 
                onClick={next}
                >
                <IonGrid class="ViewBadgeGrid" >
                    <IonRow class="ViewBadgeImage centerComp">
                        <BadgeImage BadgeEmblem={prop.badgeEmblem} Badgerank={prop.badgeRank}  idEmblem="badgeOver" idRank="badgeUnder"></BadgeImage>
                    </IonRow>
                    <br></br>
                    <IonRow className='BadgeDetails centerComp' style={{"width":"80%"}}>
        
                        <IonCardTitle style={{width:100}} class='ViewBadgeTitle' className='center ion-text-center'>
                                    {prop.name}
                        </IonCardTitle>
                        {
                            prop.qty>0 &&
                            <IonText style={{width:100}}  class='ViewBadgeTitle' className='center ion-text-center'>
                                <i>QTY:{prop.qty}</i>
                            </IonText>
                        }
                        
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
                <AR  rank={prop.badgeRank} emblem={prop.badgeEmblem}></AR>

                </IonContent>
            </IonModal>
            </div>
        )
        
    
}

export default MyBadgeCard;