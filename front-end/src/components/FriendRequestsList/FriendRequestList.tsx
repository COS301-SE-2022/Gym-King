import { IonItem, IonList, IonAvatar, IonImg, IonLabel, IonCol, IonGrid, IonRow, IonButton, useIonViewWillEnter} from '@ionic/react';
import React, {useState} from 'react'
import axios from "axios";


export type props = {requests?:any}

const FriendRequestList: React.FC<props> = () =>{

    const [requests, setRequests] = useState([])
    useIonViewWillEnter(async()=>{
        getFriendRequests()
    },[])

    const getFriendRequests = () =>{
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
        })
        .catch(err => {
            console.log(err)
            
        })
    }

    
    const confirmRequest = (otherEmail:any)=>{
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
        })
        .catch(err => {
            console.log(err)
            
        })
       
    }
    const deleteRequest = (otherEmail:string)=>{
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
            getFriendRequests()
        })
        .catch(err => {
            console.log(err)
            
        })
    }

        return(
            
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
               
        )
        

}

export default FriendRequestList;
