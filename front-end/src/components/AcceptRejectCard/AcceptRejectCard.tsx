/** 
* @file AcceptRejectCard.tsx
* @brief card that allows employee to accept or reject a claim
*/

import {IonAvatar, IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonLoading, IonRow, IonText, IonToast} from '@ionic/react';
import React, {useState} from 'react'
import './AcceptRejectCard.css'
import ActivityList from '../ActivityList/ActivityList';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
//-props, claim information
export type props = {proof:any, userID:any, username:any, badgeId:any, badgename:any, badgechallenge:string,  i1:any, i2:any, i3:any, activitytype:any,history:any, profile:string};

/** 
  * @param ? props
  * @return ? - AcceptRejectCard
*/
export const AcceptRejectCard: React.FC<props> = (props) =>{
    
    const [showAccepted, setShowAccepted] = useState(false);
    const [showRejected, setShowRejected] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    //=================================================================================================
    //    FUNCTIONS
    //=================================================================================================


    /** 
     * @brief ! - makes a call to add a badge from the badge_claim table to the badge_owned table
     * @requires ? - a call to the api
     * @result ? - claim is accepted or call to api fails 
    */
    const acceptClaim= ()=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim`,{
            "method":"PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ 
                bid: props.badgeId,
                email: props.userID
            })
        })
        .then(response =>response.data)
        .then(response =>{

            localStorage.setItem("claimAccepted", "true")
            setLoading(false)
            props.history.goBack()

        })
        .catch(err => {console.log(err)}) 
    } 

    /** 
     * @brief ! -  makes a call to remove badge from badge_claim
     * @requires ? - a call to the api
     * @result ? - a claim is rejected or the api call fails 
    */
    const rejectClaim = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim`,{
            "method":"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ 
                bid: props.badgeId,
                email: props.userID
            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response.results);

            localStorage.setItem("claimRejected", "true")
            setLoading(false)
            props.history.goBack()

        })
        .catch(err => {console.log(err)})
    }

    //=================================================================================================
    //    Render
    //=================================================================================================
        
        return(
            <>
            <IonCard mode="ios" data-testid="ARC" className="glass arCard">
                 <div style={{"backgroundColor": "#321E93", "overflow":"hidden"}}>
                    <IonAvatar  style={{"marginTop":"5%", "marginLeft":"1em", "float":"left"}}>
                        <IonImg  style={{"overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${props.profile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                    </IonAvatar>
                    <div style={{"marginTop":"6%"}}>
                    <IonText mode="ios" className='username'>{props.username}</IonText>
                    </div>
                </div>
                <IonCardContent mode="ios">
                    <IonText className='Subheading'>
                        Badge:
                    </IonText><br></br>
                    <IonText className='txtBadge'>
                        {props.badgename}
                    </IonText><br></br><br></br>
                    <IonText className="Subheading">
                        <i>{props.badgechallenge}</i>
                    </IonText>
                    <br></br><br></br>
                    <ActivityList  activityCategory={props.activitytype} i1={props.i1} i2={props.i2} i3={props.i3}></ActivityList>
                    <br></br><br></br>
                    <IonText className='Subheading'>Proof:</IonText>
                    <IonCard className='justify'>
                        <IonCardContent mode="ios">
                            <IonImg src={props.proof}></IonImg> 
                        </IonCardContent>
                    </IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton color='warning' onClick={acceptClaim}>Accept</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color='secondary' onClick={rejectClaim}>Reject</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>

            <IonToast
            mode="ios"
            isOpen={showAccepted}
            onDidDismiss={() => setShowAccepted(false)}
            message="Claim Accepted."
            duration={500}
            color="success"
            />
            <IonToast
            mode="ios"
            isOpen={showRejected}
            onDidDismiss={() => setShowRejected(false)}
            message="Claim Rejected."
            duration={500}
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


export default AcceptRejectCard;



