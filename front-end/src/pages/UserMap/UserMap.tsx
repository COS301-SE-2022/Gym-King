import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import MapView from '../../components/map/MapView';
const UserMap: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
        <MapView/>
    </IonPage>
  );
};

export default UserMap;