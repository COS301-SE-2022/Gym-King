import {IonToolbar, IonContent, IonHeader, IonItem,  IonList, IonMenu, IonTitle, IonMenuToggle,  IonLabel, IonIcon} from '@ionic/react';

import './BurgerMenu.css'
/*look at viewbadge page to see implementation
*/
export const BurgerMenu=(props:{listItems:any[]})=>{
        return(
                <IonMenu side="start" menuId="first" contentId='main'>
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                     </IonHeader>
                    <IonContent>
                        <IonList>
                            {props.listItems.map((el:any)=>
                            <IonMenuToggle auto-hide="false">
                            <IonItem button routerLink={el.route} routerDirection="none">
                                
                                <IonIcon icon={el.icon} ></IonIcon>
                                <IonLabel>{el.caption}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                            
                            )}
                        </IonList>
                    </IonContent>
                </IonMenu>
                
        )
}

export default BurgerMenu;