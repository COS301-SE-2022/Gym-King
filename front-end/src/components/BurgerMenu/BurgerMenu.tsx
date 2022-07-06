import {IonToolbar, IonContent, IonHeader, IonItem,  IonList, IonMenu, IonTitle, IonMenuToggle,  IonLabel, IonIcon} from '@ionic/react';
import { book, cog, person, trophy } from 'ionicons/icons';
import './BurgerMenu.css'

export const BurgerMenu=()=>{
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
                                    <IonItem button routerLink={"/profile"} routerDirection="none">
                                        
                                        <IonIcon icon={person} ></IonIcon>
                                        <IonLabel>Profile</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>                                

                                <IonMenuToggle auto-hide="false">
                                    <IonItem button routerLink={"/userMap"} routerDirection="none">
                                        <IonIcon icon={book} ></IonIcon>
                                        <IonLabel>Map</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>
                           
                                <IonMenuToggle auto-hide="false">
                                    <IonItem button routerLink={"/MyBadges"} routerDirection="none">
                                        <IonIcon icon={trophy} ></IonIcon>
                                        <IonLabel>  My Badges</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>

                                <IonMenuToggle auto-hide="false">
                                    <IonItem button routerLink={"/Settings"} routerDirection="none">
                                        <IonIcon icon={cog} ></IonIcon>
                                        <IonLabel>Settings</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>
                           
                        </IonList>
                    </IonContent>
                </IonMenu>
                
        )
}

export default BurgerMenu;