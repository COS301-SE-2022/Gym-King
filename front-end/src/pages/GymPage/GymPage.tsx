import {IonContent, IonPage, IonHeader,  IonButton, IonCardSubtitle, IonCard, IonCardTitle, IonModal, createAnimation} from '@ionic/react';
import React, { useState } from 'react';
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


    const [showModal, setShowModal] = useState(false);
    console.log(gid);
    const enterAnimation = (baseEl: any) => {
        const root = baseEl.shadowRoot;

        const backdropAnimation = createAnimation()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = createAnimation()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

        return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
        return enterAnimation(baseEl).direction('reverse');
    }

    return(
        <IonPage >
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
                    <IonButton onClick={()=>{setShowModal(true)}}>View Leaderboard</IonButton>
                </IonCard>
                
                <IonModal id="main" showBackdrop = {true} backdropDismiss={true}  isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
        
                    <IonHeader  id = "leaderBoardCloseButton" >
                        <IonButton color={"warning"} onClick={()=>{setShowModal(false)}}>close</IonButton>
                    </IonHeader>
                    <IonContent >
                        <Leaderboard></Leaderboard>
                    </IonContent>
                </IonModal>
            </IonContent>
            
        </IonPage>
    )
}

export default GymPage;