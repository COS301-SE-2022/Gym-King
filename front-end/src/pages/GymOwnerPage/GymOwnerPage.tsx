import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React from 'react';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './GymOwnerPage.css';
var Menulist:any[]=[{'caption':'Profile','icon':'person','route':'/OwnerProfile'},
                     {'caption':'Settings','icon':'cog','route':'/Settings'}] 
const GymOwnerPage: React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                <ToolBar menu={true} ></ToolBar>
            </IonHeader>
            <BurgerMenu listItems={Menulist}></BurgerMenu>
            <br></br>
            <IonContent fullscreen className ='Content' id="main">
                <IonText className='PageTitle center'>Owner Page</IonText>
                <IonButton className='width80 centerComp' routerLink='/ManageGyms' routerDirection="forward" color="warning">Manage Gyms</IonButton>
                <br></br>
                <IonButton className='width80 centerComp' routerLink="/GymOwner-ViewBadges" routerDirection="forward" color="warning">Manage Badges</IonButton>
                <br></br>
                <IonButton className='width80 centerComp' routerLink="/ManageEmployees" routerDirection="forward" color="warning" >Manage Employees</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default GymOwnerPage;
