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
import UserMap from './pages/UserMap/UserMap';
import PendingApprovalsPage from './pages/PendingApprovalsPage/PendingApprovalsPage';
 /*Feature-PendingApprovalsPage*/

import AcceptRejectPage from './pages/AcceptRejectPage/AcceptReject';
import CreateBadge from './pages/CreateBadgePage/CreateBadge';
import EditBadge from './pages/EditBadgePage/EditBadge';
import ViewBadgePage from './pages/ViewBadgePage/ViewBadgePage';
import ARPage from './pages/ARPage/ARPage';
import GymOwnerViewBadge from './pages/GymOwner-ViewBadge/GymOwnerViewBadge'
import Leaderboard from './pages/Leaderboard/Leaderboard'
/*develop*/


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
        <Route exact path='/PendingApprovals'>
          <PendingApprovalsPage></PendingApprovalsPage>
        </Route>
        <Route exact path='/AddGym'>
          <AddGym></AddGym>
        </Route>
        <Route exact path='/AddGymLocation'>
          <AddGymLocation></AddGymLocation>
        </Route>

        <Route exact path='/UserMap'>
          <UserMap></UserMap>
        </Route>            
        <Route exact path='/AR'>
          <ARPage></ARPage>
        </Route>     
           
        <Route exact path='/AcceptReject'>
          <AcceptRejectPage></AcceptRejectPage>
        </Route>
        <Route exact path='/CreateBadge'>
          <CreateBadge></CreateBadge>
        </Route>   
        <Route exact path='/EditBadge'>
          <EditBadge></EditBadge>
        </Route>      
        <Route exact path='/ViewBadges'>
          <ViewBadgePage></ViewBadgePage>
        </Route>  
        <Route exact path='/GymOwner-ViewBadges'>
          <GymOwnerViewBadge></GymOwnerViewBadge>
        </Route>  
        <Route exact path='/Leaderboard'>
          <Leaderboard></Leaderboard>
        </Route>  
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
