
import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSegment, IonSegmentButton, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import './Login.css';
import {claimSchema} from '../../validation/LoginValidation'


export const Login: React.FC = () =>{
    let formData:any;
    
    const [showToast, setShowToast] = useState(false);
    const [userType, setUserType] = useState('user');

    const loginSubmit= ()=>{
        
            fetch('https://gym-king.herokuapp.com/users/login',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: formData.username,
                    password: formData.password
                 })
                })
            .then(response =>response.json())
            .then(response =>{
                if(response.success){
                    window.location.href = "http://"+window.location.host+"/home";
                }else{
                    
                    setShowToast(true);
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err)
            })
    } 

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        formData={
            username: e.target.userName.value,
            password: e.target.userPassword.value,
            usertype: userType
        };
        console.log(formData)
        const isValid = await claimSchema.isValid(formData); 
            loginSubmit();
        
    }
     const segmentChanged = (e: any)=>{
        setUserType(e.detail.value);
     }
    
    
    return (
        
            <IonPage>
                <IonHeader>
                </IonHeader>
                <IonContent  fullscreen className='grad loginPage'>
                    <form action="https://gym-king.herokuapp.com/users/login" onSubmit={handleSubmit} method="POST" className='loginForm'>
                        <IonText className='center inputHeading'>Login</IonText>
                            <br></br><br></br>
                            <IonLabel className="smallHeading" position="floating">Username*</IonLabel>
                            <IonInput className='textInput' name='userName' type='text' required></IonInput>
                            
                            <br></br>
                            <IonLabel className="smallHeading" position="floating">Password*</IonLabel>
                            <IonInput className='textInput' name='userPassword' type='password' required ></IonInput>

                            <br></br>

                            <IonLabel className="smallHeading" position="floating">User type</IonLabel>
                            <IonSegment onIonChange={segmentChanged}  >
                                <IonSegmentButton value="user">
                                    <IonLabel>User</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="employee">
                                    <IonLabel>Employee</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="owner">
                                    <IonLabel>Owner</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>

                            <br></br>
                            <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Login</IonButton>
                            <br></br>
                            <div className='center'>
                                <IonText className="linkLabel">Don't have an account?</IonText><a href="http://localhost:3000/Register" color="secondary" className='linkLabel'>Register</a>
                            </div>
                            <br></br>
                            <a href="http://localhost:3000/OTP" color="secondary" className='linkLabel center'>Forgot Password?</a>
                    </form>
                </IonContent>

                <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Invalid user details."
                duration={1000}
                color="danger"
                />
            </IonPage>

            

        )
    }


export default Login;


