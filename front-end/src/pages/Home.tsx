import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import './Home.css';
import UploadActivityPage from './UploadActivityPage/UploadActivityPage';
import MapView from '../components/map/MapView';
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UploadActivityPage></UploadActivityPage>

      </IonContent>
      
      <IonContent>
        <MapView></MapView>
      </IonContent>
    </IonPage>
  );
};

export default Home;
