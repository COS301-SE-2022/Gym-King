import { IonContent, IonHeader, IonPage, } from '@ionic/react';
import MapView from '../../components/map/MapView';

import './UserMap.css'
const UserMap: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent id = "bod">
        <MapView></MapView>
      </IonContent>
    </IonPage>
  );
};

export default UserMap;