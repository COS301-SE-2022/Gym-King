import {IonContent, IonPage, IonHeader, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, useIonViewWillEnter, IonLoading} from '@ionic/react';
import React, {useState } from 'react';
import GymOwnerViewBadgeGrid from '../../components/GymOwner-ViewBadgeGrid/GymOwnerViewBadgeGrid';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './GymOwnerViewBadge.css';
import axios from "axios";


const GymOwnerViewBadge: React.FC = () =>{
    
    const [badgeList, setBadgeList] = useState(new Array<any>());
    const [loading, setLoading] = useState<boolean>(false);

        //GET REQUEST:
        useIonViewWillEnter(()=>{
            var email=localStorage.getItem("email")
            setLoading(true);
            axios.get(`https://gym-king.herokuapp.com/gyms/owned/${email}`)
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
                setLoading(false)
                var arr=[];
                for(let i=0;i<response.length;i++)
                {
                    
                    arr.push(
                        {
                            'GymName':response[i].gym_brandname,
                            'GymID':response[i].g_id,
                        }
                    )
                }
                setBadgeList(arr)
                console.log(arr)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

        },[])

    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>My Badges</IonText>
                    <IonButton routerLink='/CreateBadge' routerDirection='forward' color="warning">CREATE BADGE</IonButton>
                    <br></br><br></br>
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

                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
            </IonContent>
        </IonPage>
    )
        

}

export default GymOwnerViewBadge;
