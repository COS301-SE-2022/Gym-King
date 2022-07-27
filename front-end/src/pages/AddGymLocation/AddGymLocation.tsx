/** 
* @file AddGymLocation.tsx
* @brief provides interface to search locations and traverse map
*/
import { IonContent, IonHeader,IonPage, IonToolbar} from '@ionic/react';
import './AddGymLocation.css';
import {SelectGymMap } from '../../components/SelectGym-Map/SelectGymMap';
import React from 'react'
import ToolBar from '../../components/toolbar/Toolbar';
/**
 * AddgymLocation
 * @returns AddGymLocation page
 */
const AddGymLocation: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode='ios' class="toolbar" color="#0F005A">
              <ToolBar></ToolBar>
          </IonToolbar>
      </IonHeader>
      <IonContent>
          <SelectGymMap data-testid="sgm"></SelectGymMap>     
      </IonContent>
           
    </IonPage>
    
  );
};

export default AddGymLocation;



