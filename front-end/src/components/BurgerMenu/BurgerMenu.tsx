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
                    
                    <IonHeader>
                        <IonToolbar color="primary" mode="ios">
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                     </IonHeader>
                    <IonContent className='mainMap'>
                        <IonList  mode="ios">
                        <IonMenuToggle  auto-hide="false" >
                            {props.listItems.map((el:any)=>
                           
                            <IonItem  mode="ios" button routerLink={el.route} routerDirection="forward" key={Math.random()}>
                                
                                <IonIcon mode='ios' icon={el.icon} ></IonIcon>
                                <IonLabel style={{"paddingLeft":"3%"}}>{el.caption}</IonLabel>
                            </IonItem>
                            )}
                            <div id="logout-button">
                            <IonItem  mode="ios" button onClick={()=>{
                                                        localStorage.removeItem("email")
                                                        localStorage.removeItem("password")
                                                        localStorage.removeItem("usertype")
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