import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import AddGym from './pages/AddGym/AddGym';
import AddGymLocation from './pages/AddGymLocation/AddGymLocation';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import UploadActivityPage from './pages/UploadActivityPage/UploadActivityPage';
import PendingApprovalsPage from './pages/PendingApprovalsPage/PendingApprovalsPage';
import AcceptRejectPage from './pages/AcceptRejectPage/AcceptReject';


setupIonicReact();


const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path='/UploadActivity'>
          <UploadActivityPage></UploadActivityPage>
        </Route>
        <Route exact path='/AddGym'>
          <AddGym></AddGym>
        </Route>
        <Route exact path='/AddGymLocation'>
          <AddGymLocation></AddGymLocation>
        </Route>
        <Route exact path='/PendingApprovals'>
          <PendingApprovalsPage></PendingApprovalsPage>
        </Route>   
        <Route exact path='/AcceptReject'>
          <AcceptRejectPage></AcceptRejectPage>
        </Route>     

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
