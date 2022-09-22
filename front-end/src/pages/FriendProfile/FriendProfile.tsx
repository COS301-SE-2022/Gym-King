import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonImg} from '@ionic/react';
import React from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import MyBadgeGrid from '../../components/MyBadgeGrid/MyBadgeGrid';



const FriendProfile: React.FC = () =>{
    

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
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        <IonRow>
                                <IonCard className="profileCard" >
                                    <IonCardHeader className="inputHeading">USER123's Badges</IonCardHeader>
                                    <IonCardContent>
                                        <MyBadgeGrid badges={[]} filters={[]} sort={''} ></MyBadgeGrid>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>
                
                </IonContent>
            </IonPage>
        )
        

}

export default FriendProfile;
