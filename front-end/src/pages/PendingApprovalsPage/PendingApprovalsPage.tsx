import {IonContent, IonText, IonPage, IonHeader, IonLoading, useIonViewDidEnter, IonToast} from '@ionic/react';
import React, {useState} from 'react'
import ApprovalButton from '../../components/approvalButton/approvalButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './PendingApprovalsPage.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";


export type UploadActivityStates = {act?:any}

const PendingApprovalsPage: React.FC = () =>{

    //STATES AND VARIABLES 
    // eslint-disable-next-line
    const [claims, setClaims] = useState(new Array());
    const [loading, setLoading] = useState<boolean>(false);
    const [gymId, setGymId] = useState("");
    const [showAcceptToast, setShowAcceptToast] = useState(false);
    const [showRejectToast, setShowRejectToast] = useState(false);

    let history=useHistory()



    //GET REQUEST:
    useIonViewDidEnter(()=>{

        setShowAcceptToast(localStorage.getItem('claimAccepted')==="true")
        setShowRejectToast(localStorage.getItem('claimRejected')==="true")

        setLoading(true)
        //get employee information 
        axios(`https://gym-king.herokuapp.com/employees/employee/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response)

                setGymId(response.g_id.g_id)
                localStorage.setItem("gid", response.g_id.g_id)

                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
        console.log(localStorage.getItem("gid"));
        axios.get(`https://gym-king.herokuapp.com/claims/gym/${localStorage.getItem("gid")}`)
        .then(response =>response.data)
        .then(response =>{
            console.log(response);
            setClaims(response)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    },[gymId])

    const goToAcceptReject = () =>{
        
        history.push("/AcceptReject")
    }

        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Pending Approvals</IonText>
                    
                    {
                        claims?.map(el =>{
                            return ( <div onClick={goToAcceptReject} key={Math.random()}><ApprovalButton userID={el.email} username={el.username} badgeId={el.b_id} key={el.email + el.b_id} profile={el.profile_picture}></ApprovalButton></div>)
                        })
                    }

                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
                <IonToast
                    isOpen={showAcceptToast}
                    onDidDismiss={() => {setShowAcceptToast(false); localStorage.setItem("claimAccepted", "false")}}
                    message = "Claim accepted!"
                    duration={1000}
                    color="success"
                />
                <IonToast
                    isOpen={showRejectToast}
                    onDidDismiss={() => {setShowRejectToast(false); localStorage.setItem("claimRejected", "false")}}
                    message = "Claim rejected."
                    duration={1000}
                    color="danger"
                />
            </IonPage>
        )
        

}

export default PendingApprovalsPage;

