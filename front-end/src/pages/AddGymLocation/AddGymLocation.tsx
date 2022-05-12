import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow,  IonToolbar} from '@ionic/react';
import './AddGymLocation.css';
import {SelectGymMap } from '../../components/SelectGym-Map/SelectGymMap';
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
          <SelectGymMap></SelectGymMap> 
          <IonGrid class="SelectGymGrid" className='grid'>
              <IonRow>
                <IonIcon class="SelectGymMapIcon" name="barbell-outline"></IonIcon>
              </IonRow>
              <IonRow  >
                <IonIcon class="SelectGymMapIcon"  name="home-sharp"></IonIcon>
              </IonRow>
          </IonGrid>
         
      </IonContent>
           
    </IonPage>
    
  );
};

export default AddGymLocation;



