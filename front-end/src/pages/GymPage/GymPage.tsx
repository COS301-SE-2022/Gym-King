import {IonContent, IonPage, IonHeader,  IonButton, IonCardSubtitle, IonCard, IonCardTitle, IonModal, createAnimation, useIonViewWillEnter, IonToast, IonLoading} from '@ionic/react';
import React, { useState } from 'react';
import {ToolBar} from '../../components/toolbar/Toolbar';
import Leaderboard from '../Leaderboard/Leaderboard';
import './GymPage.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";


const GymPage: React.FC = () =>{

    let gid = sessionStorage.getItem("gid");
    let gname = sessionStorage.getItem("gym_name")
    let gbrandname = sessionStorage.getItem("gym_brandname");
    let gaddress = sessionStorage.getItem("gym_address");
    let history=useHistory()

    const [subscribed, setSubscribed]= useState(false)

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);


    const [showSubscribe, setShowSubscribe] = useState(false);
    const [showUnsubscribe, setShowUnubscribe] = useState(false);

    useIonViewWillEnter(async()=>{
        setLoading(true)
        await axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/checkIfSubscribed`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                email: localStorage.getItem("email"),
                apikey:  sessionStorage.getItem("key"),
                gid: gid

            })
        })
        .then(response =>response.data)
        .then(response =>{

            if(response===true){
                console.log(response)
                setSubscribed(true)
            }
            
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            console.log(err) 
        })
    })

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
    
    const goToViewBadges = () =>{
        history.push("/ViewBadges")
    }
    const goToLeaderboard = () =>{
        history.push("/Leaderboard")
    }

    const subscribe = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/createSubscription`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                fromEmail: localStorage.getItem("email"),
                gid:  gid

            })
        })
        .then(response =>response.data)
        .then(response =>{
            setLoading(false)
            console.log(response)
            setSubscribed(true)
            setShowSubscribe(true)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
            
        })
    }

    const unsubscribe = ()=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/deleteSubscription`,{
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                fromEmail: localStorage.getItem("email"),
                gid:  gid

            })
        })
        .then(response =>response.data)
        .then(response =>{
            setLoading(false)
            console.log(response)
            setSubscribed(false)
            setShowUnubscribe(true)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            
            <IonContent fullscreen className ='Content' id="main" >
                <IonCard className="glass gym centerComp" style={{"marginTop":"5%"}}>
                    <IonCardTitle className='center PageTitle'>{gbrandname +", "+ gname}</IonCardTitle>
                    <IonCardSubtitle color="light" className='center subheading'>{gaddress}</IonCardSubtitle>
                    {
                        !subscribed
                        &&
                        <IonButton mode="ios" color="primary" onClick={subscribe} className="width80 centerComp">Subscribe</IonButton> 
                    }
                    {
                        subscribed
                        &&
                        <IonButton mode="ios" color="primary" onClick={unsubscribe} className="width80 centerComp">Unsubscribe</IonButton> 
                    }

                    <br></br> <br></br>
                    <IonButton mode="ios"  color="warning" onClick={goToViewBadges} className="width80 centerComp">View Badges</IonButton>
                    <IonButton mode="ios" color='warning' onClick={goToLeaderboard} className="width80 centerComp" >View Leaderboard</IonButton>
                </IonCard>
                
                <IonModal mode="ios" id="main" showBackdrop = {true} backdropDismiss={true}  isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
        
                    <IonHeader  id = "leaderBoardCloseButton" >
                        <IonButton color={"warning"} onClick={()=>{setShowModal(false)}}>close</IonButton>
                    </IonHeader>
                    <IonContent >
                        <Leaderboard></Leaderboard>
                    </IonContent>
                </IonModal>
            </IonContent>
            <IonToast
                mode="ios"
                isOpen={showSubscribe}
                onDidDismiss={() => setShowSubscribe(false)}
                message="Subscribed!"
                duration={1000}
                color="success"
            />
            <IonToast
                mode="ios"
                isOpen={showUnsubscribe}
                onDidDismiss={() => setShowUnubscribe(false)}
                message="Unsubscribed!"
                duration={1000}
                color="success"
            />
            <IonLoading 
                isOpen={loading}
                message={"Loading"}
                duration={2000}
                spinner={"circles"}
                onDidDismiss={() => setLoading(false)}
                cssClass={"spinner"}
            />
        </IonPage>
    )
}

export default GymPage;