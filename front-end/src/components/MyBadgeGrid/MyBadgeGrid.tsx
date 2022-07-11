import { IonCol, IonGrid, IonRow} from '@ionic/react';
import MyBadgeCard from './MyBadgeCard/MyBadgeCard';
import './MyBadgeGrid.css'

export const MyBadgeGrid=()=>{
    return(
        <IonGrid>
            <IonRow  className="ion-align-items-center">
                <IonCol className="center">
                    <MyBadgeCard></MyBadgeCard>
                </IonCol>
            </IonRow>
        </IonGrid>
        )
        
    
}

export default MyBadgeGrid;