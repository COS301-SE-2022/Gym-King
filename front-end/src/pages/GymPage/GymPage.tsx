import {IonContent, IonPage, IonHeader, IonText, IonButton, IonTitle, IonCardSubtitle, IonCard, IonCardTitle} from '@ionic/react';
import React from 'react';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import {ToolBar} from '../../components/toolbar/Toolbar';
import Leaderboard from '../Leaderboard/Leaderboard';
import './GymPage.css';
var Menulist:any[]=[{'caption':'Profile','icon':'person','route':'/OwnerProfile'},
                     {'caption':'Settings','icon':'cog','route':'/Settings'}] 


const GymPage: React.FC = () =>{

    let gid = sessionStorage.getItem("gid");
    let gname = sessionStorage.getItem("gym_brandname");
    let gaddress = sessionStorage.getItem("gym_address");
    return(
        <IonPage>
            <IonHeader>
                <ToolBar menu={true} ></ToolBar>
            </IonHeader>
            <BurgerMenu listItems={Menulist}></BurgerMenu>
            <br></br>
            <IonContent fullscreen className ='Content' id="main">
                <IonCard>
                    <IonCardTitle className='center'>{gname}</IonCardTitle>
                    <IonCardSubtitle className='center'>{gaddress}</IonCardSubtitle>
                    
                    <IonButton>View Badges</IonButton>
                    <IonButton>View Leaderboard</IonButton>
                </IonCard>
                
            
            </IonContent>
            
        </IonPage>
    )
}

export default GymPage;