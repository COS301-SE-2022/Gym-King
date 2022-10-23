import { IonContent, IonHeader, IonPage } from '@ionic/react';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import MapView from '../../components/map/MapView';
import ToolBar from '../../components/toolbar/Toolbar';

import './UserMap.css'
const UserMap: React.FC = () => {
  
  var Menulist:any[]=[{'caption':'Profile','icon':'person','route':'/UserProfile'},
                     {'caption':'Explore','icon':'earth','route':'/Explore'},
                     {'caption':'My Badges','icon':'trophy','route':'/MyBadge'},
                     {'caption':'Friends','icon':'people','route':'/FriendsPage'},
                     {'caption':'Gyms','icon':'barbell','route':'/MyGyms'},
                     {'caption':'Notifications','icon':'mail','route':'/Notifications'},
                     {'caption':'Settings','icon':'cog','route':'/Settings'}] 

  return (
    <IonPage >
      <IonHeader>
        <ToolBar menu={true}></ToolBar>
      </IonHeader>
      <BurgerMenu  listItems={Menulist}/>
      <IonContent id ="mainBurger"  className='mainMap'>
        <MapView></MapView>
      </IonContent>
    </IonPage>
  );
};

export default UserMap;