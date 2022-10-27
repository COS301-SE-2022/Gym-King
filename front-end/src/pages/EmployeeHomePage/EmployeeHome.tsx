import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React from 'react';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './EmployeeHome.css';
var Menulist:any[]=[{'caption':'Profile','icon':'person','route':'/EmployeeProfile'},
                     {'caption':'Settings','icon':'cog','route':'/Settings'}] 
const EmployeeHomePage: React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                <ToolBar menu={true} ></ToolBar>
            </IonHeader>
            <BurgerMenu listItems={Menulist} data-testid="bm"></BurgerMenu>
            <IonContent fullscreen className ='Content' id="mainBurger">
                <IonText className='PageTitle center'>Employee Page</IonText>
                <IonButton mode="ios" className="width80 centerComp" routerLink='/PendingApprovals' routerDirection="forward" color="warning">Pending Approvals</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default EmployeeHomePage;
