import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar} from '@ionic/react';
import React, {useRef, useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./OwnerProfile.css";

import { useEffect } from 'react';


const OwnerProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);

    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    function dismiss() {
        modal.current?.dismiss();
    }

        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        <IonRow>
                            <IonCard class="profileCard">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <span className="userImage centerComp"></span>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText className="PageTitle center">Username</IonText>
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
                            <IonCol>
                                <IonCard >
                                    <IonCardHeader className="inputHeading">My Details</IonCardHeader>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol><b>Email</b></IonCol>
                                                <IonCol><IonText>john@email.com</IonText></IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol><b>Phone Number</b></IonCol>
                                                <IonCol><IonText>0123456782</IonText></IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonButton id="open-modal" expand="block">Edit Details</IonButton>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="smallCard">
                                    <IonCardContent>
                                        <IonText className="bigNumber">6</IonText><br></br>
                                        <IonText>gyms</IonText>
                                    </IonCardContent>
                                    
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="smallCard">
                                    <IonCardContent>
                                        <IonText  className="bigNumber">23</IonText><br></br>
                                        <IonText>employees</IonText>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <br></br>

                    <IonModal ref={modal} trigger="open-modal" presentingElement={presentingElement!}>
                        <IonHeader>
                            <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton color="white" onClick={() => dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Edit Details</IonTitle>
                            <IonButtons slot="end">
                                <IonButton color="white" onClick={() => dismiss()} type="submit">Confirm</IonButton>
                            </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent >
                            <form style={{"padding":"5%"}}>
                                <IonLabel className="smallHeading" position="floating">Name</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Surname</IonLabel>
                                <IonInput className='textInput' name='surname' type='text' required ></IonInput>

                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Email</IonLabel>
                                <IonInput className='textInput' name='email' type='email' required></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Phone</IonLabel>
                                <IonInput className='textInput' name='phonenumber' type='text' required ></IonInput>

                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Password</IonLabel>
                                <IonButton className='' type="button" >Change Password</IonButton>
                            </form>
                        </IonContent>
                    </IonModal>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default OwnerProfilePage;
