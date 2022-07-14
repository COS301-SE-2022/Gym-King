import { IonContent, IonHeader, IonPage, } from '@ionic/react';
import AR from '../../components/AR/AR';
const ARPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent>
        <AR rank ="b" emblem = "bicep"></AR>
      </IonContent>
    </IonPage>
  );
};

export default ARPage;