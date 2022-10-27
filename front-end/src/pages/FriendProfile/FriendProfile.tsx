import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonImg, useIonViewWillEnter, IonButton, IonToast, IonLoading, IonSlides, IonSlide} from '@ionic/react';
import React, {useRef, useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import MyBadgeCard from '../../components/MyBadgeGrid/MyBadgeCard/MyBadgeCard';


const FriendProfile: React.FC = () =>{
        
        let history=useHistory()

        let friendUsername = sessionStorage.getItem("friendUsername")
        let friendEmail = sessionStorage.getItem("friendEmail")
        let friendProfile = sessionStorage.getItem("friendProfile")
        let friendFullname = sessionStorage.getItem("friendFullname")

        const [friendBadges, setFriendBadges] = useState([])
        const [showRemoveFriend, setShowRemoveFriend] = useState(false);
        const [loading, setLoading] = useState<boolean>(false);
        const slides = useRef<any>(null);
        const slideOpts = {
            initialSlide: 0,
            speed: 400,
        
        };


        useIonViewWillEnter(async ()=>{
            setLoading(true)
            await axios.get(process.env["REACT_APP_GYM_KING_API"]+`/users/owned/${friendUsername}`,{
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                console.log(response)
                setFriendBadges(response)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        
            console.log(friendBadges);
        },[])

        const removeFriend = () =>{
            setLoading(true)
            axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/deleteRequest`,{
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    fromEmail: localStorage.getItem("email"),
                    toEmail:  friendEmail
    
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                console.log(response)
                setShowRemoveFriend(true)
                history.goBack()
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
                <IonContent>
                    <br></br>
                    <IonGrid>
                        <IonRow >
                            <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${friendProfile})`}} alt="" className="userImage centerComp contain"  ></IonImg>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText color="light" className=" center un">{friendUsername}</IonText>
                                            </IonRow>
                                            <IonRow>
                                                <i className="center">{friendFullname}</i>
                                            </IonRow>
                                            
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        <IonRow>
                                <IonCard className="profileCard" >
                                    <IonCardHeader className="inputHeading">{friendUsername}'s badges</IonCardHeader>
                                    <IonCardContent>
                                        {
                                            friendBadges.length ===0
                                            &&
                                            <IonText><i>No badges</i></IonText>
                                        }
                                        {
                                            friendBadges.length !== 0
                                            &&
                                            <IonSlides
                                                mode="ios"
                                                ref={slides}
                                                options={slideOpts}
                                                pager={true}
                                                style={{"height":"fit-content"}}>
                                                {
                                                    
                                                    friendBadges.map((el:any)=>{
                                                        return(
                                                        <IonSlide  key={el.b_id} style={{"padding":"10%", "height":"fit-content"}}>
                                                            <MyBadgeCard key={el.b_id.b_id} id={el.b_id.b_id} name={el.b_id.badgename} qty={0} badgeEmblem={el.b_id.badgeicon.split("_")[1]} badgeRank={el.b_id.badgeicon.split("_")[0]}></MyBadgeCard>
                                                            
                                                        </IonSlide>)
                                                    })
                                                }
                                                
                                            </IonSlides>
                                        }
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        <IonRow>
                            <IonButton mode="ios" style={{"width":"100%"}} onClick={removeFriend}>Remove Friend</IonButton>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>

                    <IonToast
                        mode="ios"
                        isOpen={showRemoveFriend}
                        onDidDismiss={() => setShowRemoveFriend(false)}
                        message="Friend removed"
                        duration={1000}
                        color="success"
                    />
                    <IonLoading 
                        isOpen={loading}
                        mode="ios"
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                    />
                
                </IonContent>

            </IonPage>
        )
        

}

export default FriendProfile;
