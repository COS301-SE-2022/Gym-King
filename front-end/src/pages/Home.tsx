import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import './Home.css';
import UploadActivityPage from './UploadActivityPage/UploadActivityPage';

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
    </IonPage>
  );
};

export default Home;
