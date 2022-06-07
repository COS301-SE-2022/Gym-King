import { IonContent, IonHeader, IonPage, } from '@ionic/react';
import MapView from '../../components/map/MapView';
import AR from '../../components/AR/AR';
const UserMap: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent>
        <AR></AR>
      </IonContent>
    </IonPage>
  );
};

export default UserMap;