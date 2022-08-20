import {IonContent, IonPage, IonHeader, IonText, IonCol, IonGrid, IonRow, IonLoading, useIonViewDidEnter} from '@ionic/react';
import React, { useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {ViewBadgeCard}from '../../components/ViewBadgeCard/ViewBadgeCard'
import './ViewBadgePage.css';
import axios from "axios";


const ViewBadgePage: React.FC = () =>{
    const [badges, setBadges] = useState(new Array<any>());
    const [loading, setLoading] = useState<boolean>(false);

        //GET REQUEST:
        useIonViewDidEnter(()=>
        {
            let gymid = sessionStorage.getItem("gid");
            setLoading(true)
            axios.get(`https://gym-king.herokuapp.com/badges/gym/${gymid}`)
            .then(response =>response.data)
            .then(response =>{
                let arr=[]
                for(let i=0;i<response.length;i++)
                {
                    let icon=response[i].badgeicon.split("_")
                    arr.push({
                        'b_id':response[i].b_id,
                        'badgename':response[i].badgename,
                        'badgedescription':response[i].badgedescription,
                        'icon':icon
                    })
                }
                setBadges(arr)
                setLoading(false)
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
            <IonContent fullscreen className='Content' id="main">
                    <IonText className='PageTitle center'>View Badges</IonText>
                    <IonGrid>
                        <IonRow  className="ion-align-items-center">
                        {badges.map(el => 
                        
                            <IonCol className="center" key={el.b_id}>
                                <ViewBadgeCard  BadgeID={el.b_id} BadgeTitle={el.badgename} BadgeDesc={el.badgedescription} BadgeImg={0} BadgeRank={el.icon[0]} BadgeEmblem={el.icon[1]} ></ViewBadgeCard>
                             </IonCol>)}
                        </IonRow>

                    </IonGrid>
                    
                    
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
            </IonContent>
        </IonPage>
    )
        

}

export default ViewBadgePage;
