import {IonAvatar, IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonRow, IonText} from '@ionic/react';
import React from 'react'
import './AcceptRejectCard.css'
import ActivityList from '../ActivityList/ActivityList';
import 'react-toastify/dist/ReactToastify.css';

//creating a type so props can be entered
export type props = {proof:any, userID:any, username:any, badgeId:any, badgename:any, badgechallenge:string,  i1:any, i2:any, i3:any, activitytype:any,history:any, profile:string};


export class AcceptRejectCard extends React.Component<props>{
    
    acceptClaim= ()=>{
        fetch(`https://gym-king.herokuapp.com/claims/claim`,{
            "method":"PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                bid: this.props.badgeId,
                email: this.props.userID
            })
        })
        .then(response =>response.json())
        .then(response =>{
/*
            let history=useHistory()
            history.push("/PendingApprovals");*/
            this.props.history.goBack()

        })
        .catch(err => {console.log(err)}) 
    } 
    rejectClaim = () =>{
        fetch(`https://gym-king.herokuapp.com/claims/claim`,{
            "method":"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                bid: this.props.badgeId,
                email: this.props.userID
            })
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response.results);
            //display toast 
            //redirect to PendingApprovals
            /*
            let history=useHistory()
            history.push("/PendingApprovals"); */
            this.props.history.goBack()

        })
        .catch(err => {console.log(err)})
    }
    render(){
        
        return(
            <IonCard data-testid="ARC" className="glass arCard">
                 <div style={{"backgroundColor": "#321E93", "overflow":"hidden"}}>
                    <IonAvatar style={{"marginTop":"5%", "marginLeft":"1em", "float":"left"}}>
                        <IonImg  style={{"overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${this.props.profile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                    </IonAvatar>
                    <div style={{"marginTop":"6%"}}>
                    <IonText className='username'>{this.props.username}</IonText>
                    </div>
                </div>
                <IonCardContent>
                    <IonText className='Subheading'>
                        Badge:
                    </IonText><br></br>
                    <IonText className='txtBadge'>
                        {this.props.badgename}
                    </IonText><br></br><br></br>
                    <IonText className="Subheading">
                        <i>{this.props.badgechallenge}</i>
                    </IonText>
                    <br></br><br></br>
                    <ActivityList  activityCategory={this.props.activitytype} i1={this.props.i1} i2={this.props.i2} i3={this.props.i3}></ActivityList>
                    <br></br><br></br>
                    <IonText className='Subheading'>Proof:</IonText>
                    <IonCard className='justify'>
                        <IonCardContent >
                            <IonImg src={this.props.proof}></IonImg> 
                        </IonCardContent>
                    </IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton color='warning' onClick={this.acceptClaim}>Accept</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color='secondary' onClick={this.rejectClaim}>Reject</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
            
        )
        
    }
}

export default AcceptRejectCard;



