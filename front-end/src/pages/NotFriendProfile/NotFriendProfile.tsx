import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonImg, IonButton} from '@ionic/react';
import React from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';



const NotFriendProfile: React.FC = () =>{
        localStorage.setItem("friendRequest","true")
        const sendFriendRequest = ()=>{

        }

        return(
            <IonPage >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        {
                            localStorage.getItem("friendRequest")==="true"
                            &&
                            <IonRow >
                                <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size='5'>
                                                <i className="center">user234 wants to follow you</i>
                                            </IonCol>
                                            <IonCol size="7">
                                                <IonRow>
                                                    <IonText color="light" className="PageTitle center un">USER123</IonText>
                                                </IonRow>
                                                <IonRow>
                                                    <i className="center">Name Surname</i>
                                                </IonRow>
                                                
                                            </IonCol>
                                        </IonRow>
                                        
                                    </IonGrid>
                                </IonCard>
                            </IonRow>
                        }
                        <IonRow >
                            <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${""})`}} alt="" className="userImage centerComp contain"  ></IonImg>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText color="light" className="PageTitle center un">USER123</IonText>
                                            </IonRow>
                                            <IonRow>
                                                <i className="center">Name Surname</i>
                                            </IonRow>
                                            
                                        </IonCol>
                                    </IonRow>
                                    <br></br><br></br>
                                    <IonRow>
                                        <IonButton onClick={sendFriendRequest}>Send Friend Request</IonButton>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>
                
                </IonContent>
            </IonPage>
        )
        

}

export default NotFriendProfile;
