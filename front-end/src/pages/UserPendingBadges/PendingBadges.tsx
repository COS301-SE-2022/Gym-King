import {IonContent, IonText, IonPage, IonHeader, IonLoading, useIonViewDidEnter} from '@ionic/react';
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
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/users/claims/${localStorage.getItem("username")}`)
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
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Pending Badges</IonText>
                    
                    {
                        
                        claims.length!==0 && claims?.map(el =>{
                            
                            return ( <PendingBadgeItem badgeName={el.b_id.badgename} key={el.email + el.b_id} badgeIcon={el.b_id.badgeicon}></PendingBadgeItem>)
                        }) 
                    }
                    
                    <IonLoading 
                        mode="ios"
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

export default PendingBadgesPage;
