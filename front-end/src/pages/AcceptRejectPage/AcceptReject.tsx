import { IonContent, IonHeader, IonText, IonPage} from '@ionic/react';
import React, {useState} from 'react'
import AcceptRejectCard from '../../components/AcceptRejectCard/AcceptRejectCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AcceptReject.css';

const AcceptRejectPage: React.FC = () =>{

    //GET REQUEST:
    let badgeId = localStorage.getItem('badgeId');
    let email = localStorage.getItem('email');
    let username = localStorage.getItem('username');
    //const [claim, setClaim] = useState({b_id:'0', i1:'', i2:'', i3:''});
    const [i1, setI1] = useState('');
    const [i2, setI2] = useState('');
    const [i3, setI3] = useState('');

    const getClaim=()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${badgeId}&email=${email}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            //console.log();
            //setClaim(response.results[0]);
            setI1(response.results[0].input1);
            setI2(response.results[0].input2);
            setI3(response.results[0].input3);
        })
        .catch(err => {console.log(err)})
    }

    getClaim();
    
    const [badgename, setBadgename] = useState('');
   
    const [activitytype, setActivityType] = useState('');
     
    const getBadges= ()=>{
        fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            //console.log(response.results[0]);

            setBadgename(response.results[0].badgename)
            setActivityType(response.results[0].activitytype)
            //setG_id(response.results[0].g_id)
        })
        .catch(err => {console.log(err)})
    } 
    getBadges();

        return (
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Accept/Reject</IonText>
                    <AcceptRejectCard userID={email} username={username} badgeId={badgeId} badgename={badgename} i1={i1} i2={i2} i3={i3} activitytype={activitytype}></AcceptRejectCard>
                </IonContent>
            </IonPage>
        )

}
export default AcceptRejectPage;
