import { IonContent, IonHeader, IonText, IonPage, IonLoading, useIonViewDidEnter} from '@ionic/react';
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import AcceptRejectCard from '../../components/AcceptRejectCard/AcceptRejectCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AcceptReject.css';
import axios from "axios";

export const AcceptRejectPage: React.FC = () =>{

    //STATES AND VARIABLES 
    let badgeId = localStorage.getItem('user_badgeId');
    let email = localStorage.getItem('user_email');
    let username = localStorage.getItem('user_username');
    let profile = localStorage.getItem("user_profile")
    const [i1, setI1] = useState('');
    const [i2, setI2] = useState('');
    const [i3, setI3] = useState('');
    const [badgename, setBadgename] = useState('');
    const [badgechallenge, setBadgechallenge] = useState('');
    const [activitytype, setActivityType] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [proof, setProof] = useState("");
    const history=useHistory();


    //GET THE CLAIM 
    useIonViewDidEnter(()=>{
        setLoading(true);
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim?bid=${badgeId}&email=${email}`)
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setI1(response.input1);
            setI2(response.input2);
            setI3(response.input3);
            setProof(response.proof);

            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    },[badgeId, email])
    
    //GET THE BADGE NAME AND ACTIVITY TYPE OR THE CLAIM
        useIonViewDidEnter(()=>
            {
                axios.get(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge/${badgeId}`)
                .then(response =>response.data)
                .then(response =>{
                    console.log(response);

                    setBadgename(response.badgename)
                    setBadgechallenge(response.badgechallenge)
                    setActivityType(response.activitytype)
                    //setG_id(response.results[0].g_id)
                })
                .catch(err => {console.log(err)})
            },[badgeId])
        return (
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Accept/Reject</IonText>
                    <AcceptRejectCard proof={proof} userID={email} username={username} badgeId={badgeId} badgename={badgename} badgechallenge={badgechallenge}i1={i1} i2={i2} i3={i3} activitytype={activitytype} history={history} profile={profile!}></AcceptRejectCard>
<br></br><br></br>
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

export default AcceptRejectPage ;