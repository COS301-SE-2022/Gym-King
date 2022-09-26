import { IonItem, IonList, IonAvatar, IonImg, IonLabel, IonCol, IonGrid, IonRow, IonButton, useIonViewWillEnter} from '@ionic/react';
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";


export type props = {requests?:any}

const FriendRequestList: React.FC<props> = () =>{

    let history=useHistory()
    const [requests, setRequests] = useState([])
    useIonViewWillEnter(()=>{
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

    },[])

    const viewProfile= () =>{
        //if friend:
        history.push("/FriendProfile")
        //if not friend:
        history.push("/NotFriendProfile")
    }
    
    const confirmRequest = ()=>{

       
    }
    const deleteRequest = ()=>{
        
    }

        return(
            
            <IonList>
                {
                    requests?.map((el:any)=>{
                        return (<IonItem button detail  onClick={viewProfile} data-testid="aB" key={el.email + Math.random()}>
     

                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2">
                                            <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                                                <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${el.profile_picture})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel>{el.username}</IonLabel>
                                        </IonCol>
                                        <IonRow>
                                            <IonCol style={{"paddingLeft":"0"}}>
                                                <IonButton color="warning" style={{"width":"90%", "float":"left"}} onClick={confirmRequest}>Confirm</IonButton>
                                            </IonCol>
                                            <IonCol>
                                                <IonButton color="medium" style={{"width":"90%" , "float":"left"}} onClick={deleteRequest}>Delete</IonButton>
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
