import {IonContent, IonPage, IonHeader, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import GymOwnerViewBadgeGrid from '../../components/GymOwner-ViewBadgeGrid/GymOwnerViewBadgeGrid';
import { ToolBar } from '../../components/toolbar/Toolbar';

import './GymOwnerViewBadge.css';


const GymOwnerViewBadge: React.FC = () =>{
    
    const [badgeList, setBadgeList] = useState(new Array<any>());
        //GET REQUEST:
        useEffect(()=>
        {
            var email="u20519517@tuks.co.za"
            fetch(`https://gym-king.herokuapp.com/gyms/owned?email=${email}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log("fetching gyms")
                console.log(response.results.length)
                var arr=[];
                for(let i=0;i<response.results.length;i++)
                {
                    
                    arr.push(
                        {
                            'GymName':response.results[i].gym_brandname,
                            'GymID':response.results[i].g_id,
                        }
                    )
                }
                setBadgeList(arr)
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
                    <IonButton href="http://localhost:3000/CreateBadge">CREATE BADGE</IonButton>
                    <IonAccordionGroup>
                    {badgeList.map(el => 
                        <IonAccordion key={el.GymID} value={el.GymID}>
                            <IonItem slot="header">
                                <IonLabel>{el.GymName}</IonLabel>
                             </IonItem>
                             <IonList slot="content">
                               <GymOwnerViewBadgeGrid gymID={el.GymID} ></GymOwnerViewBadgeGrid>
                            </IonList>
                        </IonAccordion>
                    )}
                    </IonAccordionGroup>    
            </IonContent>
        </IonPage>
    )
        

}

export default GymOwnerViewBadge;