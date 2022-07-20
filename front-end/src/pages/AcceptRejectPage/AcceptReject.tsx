import { IonContent, IonHeader, IonText, IonPage, IonLoading} from '@ionic/react';
import React, {useEffect, useState} from 'react'
import AcceptRejectCard from '../../components/AcceptRejectCard/AcceptRejectCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AcceptReject.css';

export const AcceptRejectPage: React.FC = () =>{

    //STATES AND VARIABLES 
    let badgeId = localStorage.getItem('badgeId');
    let email = localStorage.getItem('email');
    let username = localStorage.getItem('username');
    const [i1, setI1] = useState('');
    const [i2, setI2] = useState('');
    const [i3, setI3] = useState('');
    const [badgename, setBadgename] = useState('');
    const [activitytype, setActivityType] = useState('');
    const [loading, setLoading] = useState<boolean>(false);



    //GET THE CLAIM 
    useEffect(()=>{
        setLoading(true);
        fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${badgeId}&email=${email}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            setI1(response.input1);
            setI2(response.input2);
            setI3(response.input3);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    },[badgeId, email])
    
    //GET THE BADGE NAME AND ACTIVITY TYPE OR THE CLAIM
        useEffect(()=>
            {
                fetch(`https://gym-king.herokuapp.com/badges/badge/${badgeId}`,{
                "method":"GET"
                })
                .then(response =>response.json())
                .then(response =>{
                    console.log(response);

                    setBadgename(response.badgename)
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
                    <AcceptRejectCard userID={email} username={username} badgeId={badgeId} badgename={badgename} i1={i1} i2={i2} i3={i3} activitytype={activitytype}></AcceptRejectCard>

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
export default AcceptRejectPage;
