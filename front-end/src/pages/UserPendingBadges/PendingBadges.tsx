import {IonContent, IonText, IonPage, IonHeader, IonLoading, useIonViewDidEnter, IonList, IonCard} from '@ionic/react';
import React, {useState} from 'react'
import PendingBadgeItem from '../../components/PendingBadgeItem/PendingBadgeItem';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './PendingBadges.css';
import axios from "axios";

const PendingBadgesPage: React.FC = () =>{

    //STATES AND VARIABLES 
    // eslint-disable-next-line
    const [claims, setClaims] = useState(new Array());
    const [loading, setLoading] = useState<boolean>(false);

    //GET REQUEST:
    useIonViewDidEnter(()=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/claims`,{
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
                console.log("PENDING BADGES",response)
                setClaims(response)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    },[])



        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Pending Badges</IonText>

                        <IonList mode="ios" className='transparentBack'>
                        {
                            
                            claims.length!==0 && claims?.map(el =>{
                                
                                return ( <PendingBadgeItem badgeName={el.b_id.badgename} key={el.email + el.b_id} badgeIcon={el.b_id.badgeicon}></PendingBadgeItem>)
                            }) 
                        }
                        </IonList>
                    
                    
                    <IonLoading 
                        mode="ios"
                        isOpen={loading}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default PendingBadgesPage;
