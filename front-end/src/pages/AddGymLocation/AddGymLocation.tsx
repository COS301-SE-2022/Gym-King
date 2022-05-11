import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import './AddGymLocation.css';
import { PigeonMap } from '../../components/pigeonMaps/pigeonMap';
const AddGymLocation: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode='ios' class="toolbar" color="#0F005A">
                <IonButton  class="AddGymLocationFlexMargin" href="http://localhost:3000/AddGym">
                     <IonIcon class="AddGymArrow" name="chevron-back-outline"></IonIcon>
                      <span>Back</span>
                </IonButton>
          </IonToolbar>
      </IonHeader>
      <IonContent>
          <PigeonMap></PigeonMap>
  
        
      </IonContent>
    </IonPage>
  );
};

export default AddGymLocation;



