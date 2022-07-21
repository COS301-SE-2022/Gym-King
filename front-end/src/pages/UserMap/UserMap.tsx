import { IonContent, IonHeader, IonPage, } from '@ionic/react';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import MapView from '../../components/map/MapView';
import ToolBar from '../../components/toolbar/Toolbar';

import './UserMap.css'
const UserMap: React.FC = () => {
  var Menulist:any[]=[{'caption':'Profile','icon':'person','route':'/UserProfile'},
                     {'caption':'My Badges','icon':'trophy','route':'/MyBadge'},
                     {'caption':'Settings','icon':'cog','route':'/Settings'}] 
  return (
    <IonPage>
      <IonHeader>
        <ToolBar menu={true}></ToolBar>
      </IonHeader>
      <BurgerMenu listItems={Menulist}/>
      <IonContent id="main">
        <MapView></MapView>
      </IonContent>
    </IonPage>
  );
};

export default UserMap;