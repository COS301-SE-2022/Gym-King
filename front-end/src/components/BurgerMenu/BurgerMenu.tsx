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
                <IonMenu  side="start" menuId="first" contentId='mainBurger' >
                    
                    <IonHeader style={{"height":"7%"}}>
                        <IonToolbar color="primary" mode="ios" style={{"height":"100%"}}>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                     </IonHeader>
                    <IonContent className='mainMap' color="secondary">
                        <IonList  mode="ios" color='primary'>
                        <IonMenuToggle  auto-hide="false" >
                            {props.listItems.map((el:any)=>
                           
                            <IonItem color="secondary" mode="ios" button routerLink={el.route} routerDirection="forward" key={Math.random()}>
                                
                                <IonIcon mode='ios' icon={el.icon} ></IonIcon>
                                <IonLabel style={{"paddingLeft":"3%"}}>{el.caption}</IonLabel>
                            </IonItem>
                            )}
                            <div id="logout-button">
                            <IonItem  color="secondary" mode="ios" button onClick={()=>{
                                                        localStorage.removeItem("email")
                                                        localStorage.removeItem("username")
                                                        localStorage.removeItem("password")
                                                        localStorage.removeItem("usertype")
                                                        sessionStorage.removeItem("key")
                                                        history.push("/Login");
                                                    }}>
                                
                                <IonIcon mode="ios" icon={exit} ></IonIcon>
                                <IonLabel style={{"paddingLeft":"3%"}}>Logout</IonLabel>
                            </IonItem>
                            </div>
                        </IonMenuToggle>

                        </IonList>
                    </IonContent>
                </IonMenu>
        )
}

export default BurgerMenu;