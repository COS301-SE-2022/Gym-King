import {IonContent, IonPage, IonHeader, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, useIonViewDidEnter, IonLoading} from '@ionic/react';
import React, {useState } from 'react';
import GymOwnerViewBadgeGrid from '../../components/GymOwner-ViewBadgeGrid/GymOwnerViewBadgeGrid';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './GymOwnerViewBadge.css';
import axios from "axios";


const GymOwnerViewBadge: React.FC = () =>{
    
    const [badgeList, setBadgeList] = useState(new Array<any>());
    const [loading, setLoading] = useState<boolean>(false);

        //GET REQUEST:
        useIonViewDidEnter(()=>{
            setLoading(true);
            axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/getGyms`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key")
    
                })
            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response)
                setLoading(false)
                var arr=[];
                for(let i=0;i<response.length;i++)
                {
                    
                    arr.push(
                        {
                            'GymName':response[i].gym_name,
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
                    <IonButton mode="ios" routerLink='/CreateBadge' routerDirection='forward' color="warning">CREATE BADGE</IonButton>
                    <br></br><br></br>
                    <IonAccordionGroup mode="ios">
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
                        mode="ios"
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
