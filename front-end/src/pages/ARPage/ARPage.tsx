import { IonContent, IonHeader, IonPage, } from '@ionic/react';
import MapView from '../../components/map/MapView';
const ARPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent>
        <MapView>
      </IonContent>
    </IonPage>
  );
};

export default ARPage;