import { IonItem, IonList, IonAvatar, IonImg, IonLabel, IonCol, IonGrid, IonRow, IonButton, useIonViewWillEnter, IonToast, IonLoading} from '@ionic/react';
import React, {useState} from 'react'
import axios from "axios";


export type props = {requests?:any}

const FriendRequestList: React.FC<props> = () =>{

    const [requests, setRequests] = useState([])
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);


    useIonViewWillEnter(async()=>{
        getFriendRequests()
    },[])

    const getFriendRequests = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getReceivedRequests`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                userEmail: localStorage.getItem("email"),

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setRequests(response.results)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    
    const confirmRequest = (otherEmail:any)=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/CreateRequest`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                fromEmail: localStorage.getItem("email"),
                toEmail:  otherEmail

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            getFriendRequests()
            setShowConfirm(true)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
       
    }
    const deleteRequest = (otherEmail:string)=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/deleteRequest`,{
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                fromEmail: localStorage.getItem("email"),
                toEmail:  otherEmail

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setLoading(false)
            getFriendRequests()
            setShowDelete(true)

        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

        return(
            <>
            <IonList mode="ios">
                {
                    requests?.map((el:any)=>{
                        return (<IonItem  mode="ios" data-testid="aB" key={el.email} >
     

                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2">
                                            <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                                                <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${el.profile_picture})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel style={{"marginTop":"15%"}}>{el.username}</IonLabel>
                                        </IonCol>
                                        <IonRow>
                                            <IonCol style={{"paddingLeft":"0", "marginTop":"2%"}}>
                                                <IonButton color="warning" style={{"width":"90%", "float":"left"}} onClick={()=>confirmRequest(el.email)}>Confirm</IonButton>
                                            </IonCol>
                                            <IonCol style={{ "marginTop":"2%"}}>
                                                <IonButton mode="ios" color="medium" style={{"width":"90%" , "float":"left"}} onClick={()=>deleteRequest(el.email)}>Delete</IonButton>
                                            </IonCol>
                                        </IonRow>
                                        
                                    </IonRow>
                                </IonGrid>
                            </IonItem>)
                    })
                }
            </IonList>  
            <IonToast
                mode="ios"
                isOpen={showConfirm}
                onDidDismiss={() => setShowConfirm(false)}
                message="Friend Request Accepted!"
                duration={1000}
                color="success"
            />
            <IonToast
                mode="ios"
                isOpen={showDelete}
                onDidDismiss={() => setShowDelete(false)}
                message="Friend Request Rejected!"
                duration={1000}
                color="success"
            />
            <IonLoading 
                isOpen={loading}
                message={"Loading"}
                duration={2000}
                spinner={"circles"}
                onDidDismiss={() => setLoading(false)}
                cssClass={"spinner"}
            />
            </>
        )
        

}

export default FriendRequestList;
