import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import DropDown from '../components/dropdown/dropdown';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DropDown list={['Cardio', 'Strength']}></DropDown>
      </IonContent>
    </IonPage>
  );
};

export default Home;
