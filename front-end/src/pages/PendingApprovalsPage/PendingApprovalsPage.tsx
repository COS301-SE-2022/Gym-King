import {IonContent, IonText, IonPage, IonHeader, IonLoading} from '@ionic/react';
import React, {useState} from 'react'
import ApprovalButton from '../../components/approvalButton/approvalButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './PendingApprovalsPage.css';
import { useHistory } from 'react-router-dom';


export type UploadActivityStates = {act?:any}

const PendingApprovalsPage: React.FC = () =>{

    //STATES AND VARIABLES 
    // eslint-disable-next-line
    const [claims, setClaims] = useState(new Array());
    const [loading, setLoading] = useState<boolean>(false);
    const [gymId, setGymId] = useState("");
    let history=useHistory()



    //GET REQUEST:
    useIonViewWillEnter(()=>{
        setLoading(true)
        //get employee information 
        fetch(`https://gym-king.herokuapp.com/employees/employee/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)

                setGymId(response.g_id.g_id)

                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
        console.log(gymId);
        fetch(`https://gym-king.herokuapp.com/claims/gym/${gymId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            //console.log(response);
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
                            return ( <div onClick={goToAcceptReject}><ApprovalButton userID={el.email} username={el.username} badgeId={el.b_id} key={el.email + el.b_id}></ApprovalButton></div>)
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
            </IonPage>
        )
        

}

export default PendingApprovalsPage;
function useIonViewWillEnter(arg0: () => void, arg1: string[]) {
    throw new Error('Function not implemented.');
}

