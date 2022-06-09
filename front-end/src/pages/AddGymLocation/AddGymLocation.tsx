import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import './AddGymLocation.css';
import {SelectGymMap } from '../../components/SelectGym-Map/SelectGymMap';
import React from 'react'
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
      </IonContent>
           
    </IonPage>
    
  );
};

export default AddGymLocation;



