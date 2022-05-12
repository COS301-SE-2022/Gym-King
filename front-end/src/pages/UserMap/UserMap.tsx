import { IonContent, IonHeader, IonPage, } from '@ionic/react';
import MapView from '../../components/map/MapView';
const UserMap: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent>
        <MapView/>
      </IonContent>
    </IonPage>
  );
};

export default UserMap;