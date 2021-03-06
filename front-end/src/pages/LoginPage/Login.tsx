
import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSegment, IonSegmentButton, IonText, IonToast, useIonViewWillEnter} from '@ionic/react';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import './Login.css';


export const Login: React.FC = () =>{
    useIonViewWillEnter(()=>{
        if(localStorage.getItem("email")!=null && localStorage.getItem("password")!=null && localStorage.getItem("usertype")!=null)
        {
            navigate()
        }
    })
    let formData:any;
    let history=useHistory()
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
                    email: formData.email,
                    password: formData.password,
                    usertype: formData.usertype
                 })
                })
            .then(response =>response.json())
            .then(response =>{
                if(response.success){
                   // window.location.href = "http://"+window.location.host+"/home";
                   localStorage.setItem("email", formData.email)
                   localStorage.setItem("password", formData.password)
                   localStorage.setItem("usertype",formData.usertype)
                   navigate();
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
    const navigate=()=>{
        let usertype=localStorage.getItem("usertype")
        if(usertype==="gym_user")
        {
            history.push("/userMap")
        }
        else if(usertype==="gym_owner")
        {
            history.push("/GymOwnerPage")
        }
        else{
            history.push("/EmployeeHome")
        }
    }
    

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        formData={
            email: e.target.email.value,
            password: e.target.userPassword.value,
            usertype: userType
        };
        console.log(formData)
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
                            <IonLabel className="smallHeading" position="floating">Email*</IonLabel>
                            <IonInput className='textInput' name='email' type='text' required></IonInput>
                            
                            <br></br>
                            <IonLabel className="smallHeading" position="floating">Password*</IonLabel>
                            <IonInput className='textInput' name='userPassword' type='password' required ></IonInput>

                            <br></br>

                            <IonLabel className="smallHeading" position="floating">User type</IonLabel>
                            <IonSegment onIonChange={segmentChanged}  >
                                <IonSegmentButton value="gym_user">
                                    <IonLabel>User</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="gym_employee">
                                    <IonLabel>Employee</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="gym_owner">
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


