import {IonContent, IonPage, IonHeader, IonText, IonCol, IonGrid, IonRow, IonLoading} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {ViewBadgeCard}from '../../components/ViewBadgeCard/ViewBadgeCard'
import './ViewBadgePage.css';


const ViewBadgePage: React.FC = () =>{
    var Menulist:any[]=[{'caption':'Profile','icon':'person','route':'/profile'},
                     {'caption':'Map','icon':'book','route':'/userMap'},
                     {'caption':'My Badges','icon':'trophy','route':'/myBadges'},
                     {'caption':'Settings','icon':'cog','route':'/Settings'}] 
    const [badges, setBadges] = useState(new Array<any>());
    const [loading, setLoading] = useState<boolean>(false);

        //GET REQUEST:
        useEffect(()=>
        {
            var gymid="wSek"
            setLoading(true)
            fetch(`https://gym-king.herokuapp.com/badges/gym/${gymid}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                console.log("this is the response")
                console.log(response)
                setBadges(response)
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
            <BurgerMenu listItems={Menulist}/>
            <IonContent fullscreen className='Content' id="main">
                    <IonText className='PageTitle center'>View Badges</IonText>
                    <IonGrid>
                        <IonRow  className="ion-align-items-center">
                        {badges.map(el => 
                        
                            <IonCol className="center" key={el.b_id}>
                                <ViewBadgeCard  BadgeID={el.b_id} BadgeTitle={el.badgename} BadgeDesc={el.badgedescription} BadgeImg={0}></ViewBadgeCard>
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
