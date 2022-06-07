import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './GymOwnerViewBadge.css';


const GymOwnerViewBadge: React.FC = () =>{
    
    const [badges, setBadges] = useState(new Array<any>());
    
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
                var arr:any=[];
                for(let i=0;i<response.results.length;i++)
                {
                    arr.push(
                        {
                            'GymName':response.results[i].gym_brandname,
                            'GymID':response.results[i].g_id,
                            'GymDetails':fetchBadges(response.results[i].g_id)
                        }
                    )
                }
                console.log(arr)
                setBadges(arr)
            })
            .catch(err => {console.log(err)})
        },[])

        const fetchBadges=(gymid:string)=>{
            
            fetch(`https://gym-king.herokuapp.com/badges/gym?gid=${gymid}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                return response.results
            })
            .catch(err => {console.log(err)})

        }
    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>View Badges</IonText>
                    <IonButton>CREATE BADGE</IonButton>
                    {badges.map(el => 
                        
                        el.GymName)}
            </IonContent>
        </IonPage>
    )
        

}

export default GymOwnerViewBadge;