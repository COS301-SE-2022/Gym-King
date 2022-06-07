import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './GymOwnerViewBadge.css';


const GymOwnerViewBadge: React.FC = () =>{
    
    const [badges, setBadges] = useState(new Array<any>());
    
        //GET REQUEST:
        useEffect(()=>
        {
            var gymid="lttD"
            fetch(`https://gym-king.herokuapp.com/badges/gym?gid=${gymid}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log("this is the response")
                console.log(response)
                setBadges(response.results)
            })
            .catch(err => {console.log(err)})
        },[])
    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>View Badges</IonText>
                    <IonButton>CREATE BADGE</IonButton>
            </IonContent>
        </IonPage>
    )
        

}

export default GymOwnerViewBadge;