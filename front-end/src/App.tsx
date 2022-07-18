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
import LoginPage from './pages/LoginPage/Login';
import { RegisterPage } from './pages/CreateUserPage/Register';
import {OTP} from './pages/OTP/OTP';
import MyBadge from './pages/MyBadge/MyBadge'
import ManageGyms from './pages/ManageGyms/ManageGyms';
import UserProfilePage from './pages/UserProfile/UserProfile';
import OwnerProfilePage from './pages/OwnerProfile/OwnerProfile';
import EmployeeProfilePage from './pages/EmployeeProfile/EmployeeProfile';
import GymOwnerPage from './pages/GymOwnerPage/GymOwnerPage'
import EditGym from './pages/EditGymPage/EditGym'
import GymPage from './pages/GymPage/GymPage';
import PendingBadgesPage from './pages/UserPendingBadges/PendingBadges';
import EmployeeHomePage from './pages/EmployeeHomePage/EmployeeHome';
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
          <Redirect to="/Login" />
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
        <Route exact path='/Login'>
          <LoginPage></LoginPage>
        </Route>
        <Route exact path='/Register'>
          <RegisterPage></RegisterPage>
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
        <Route exact path='/OTP'>
          <OTP></OTP>
        </Route>
        <Route exact path ='/MyBadge'>
          <MyBadge></MyBadge>
        </Route>
        <Route exact path="/ManageGyms">
          <ManageGyms></ManageGyms>
        </Route>
        <Route exact path="/UserProfile">
          <UserProfilePage></UserProfilePage>
        </Route>
        <Route exact path="/OwnerProfile">
          <OwnerProfilePage></OwnerProfilePage>
        </Route>
        <Route exact path="/EmployeeProfile">
          <EmployeeProfilePage></EmployeeProfilePage>
        </Route>
        <Route exact path='/GymOwnerPage'>
          <GymOwnerPage></GymOwnerPage>
        </Route>
        <Route exact path='/EditGym'>
          <EditGym></EditGym>
        </Route>
        <Route exact path='/GymPage'>
          <GymPage></GymPage>
        </Route>
        <Route exact path='/PendingBadges'>
          <PendingBadgesPage></PendingBadgesPage>
        </Route>
        <Route exact path='/EmployeeHome'>
          <EmployeeHomePage></EmployeeHomePage>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
