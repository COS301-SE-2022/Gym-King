import {IonToolbar, IonContent, IonHeader, IonItem,  IonList, IonMenu, IonTitle, IonMenuToggle,  IonLabel, IonIcon} from '@ionic/react';
import { exit } from 'ionicons/icons';
import { useHistory } from 'react-router';

import './BurgerMenu.css'
/*look at viewbadge page to see implementation
*/
export const BurgerMenu=(props:{listItems:any[]})=>{
        // used for routing
        let history=useHistory()
        return(
                <IonMenu side="start" menuId="first" contentId='main'>
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                     </IonHeader>
                    <IonContent>
                        <IonList>
                        <IonMenuToggle auto-hide="false">
                            {props.listItems.map((el:any)=>
                           
                            <IonItem button routerLink={el.route} routerDirection="forward" key={Math.random()}>
                                
                                <IonIcon icon={el.icon} ></IonIcon>
                                <IonLabel>{el.caption}</IonLabel>
                            </IonItem>
                            )}
                            <div id="logout-button">
                            <IonItem button onClick={()=>{
                                                        localStorage.removeItem("email")
                                                        localStorage.removeItem("password")
                                                        localStorage.removeItem("usertype")
                                                        history.push("/Login");
                                                    }}>
                                
                                <IonIcon icon={exit} ></IonIcon>
                                <IonLabel>Logout</IonLabel>
                            </IonItem>
                            </div>
                        </IonMenuToggle>

                        </IonList>
                    </IonContent>
                </IonMenu>
                
        )
}

export default BurgerMenu;