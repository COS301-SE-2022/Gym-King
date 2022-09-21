
import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSegment, IonSegmentButton, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import { useHistory } from 'react-router';
import axios from "axios";


export const ForgotPassword: React.FC = () =>{
    // for routing
    let history=useHistory()
    let formData:any
    const [showToast, setShowToast] = useState(false);
    const [userType, setUserType] = useState('');

    
    const segmentChanged = (e: any)=>{
        setUserType(e.detail.value);
     }

     const handleSubmit = async (e:any) =>{
        e.preventDefault();

        formData={
            email: e.target.email.value.trim(),
            usertype: userType
        };
        sessionStorage.setItem("enteredEmail", formData.email)
        sessionStorage.setItem("enteredUserType", formData.usertype)
        
        if(formData.usertype === "gym_user")
        {
            
            sendUserOTP()
        }
        else if(formData.usertype === "gym_employee")
        {
            sendEmployeeOTP()
        }
        else if(formData.usertype === "gym_owner")
        {
            sendOwnerOTP()
        }
        
        
    }

    const sendUserOTP = () =>{
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/users/user/OTP`, 
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: { 
              email:formData.email
              }
        })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   history.push("/OTP")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const sendEmployeeOTP = () =>{
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/employees/employee/OTP`, 
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: { 
              email:formData.email
              }
        })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   history.push("/OTP")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const sendOwnerOTP = () =>{
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/owners/owner/OTP`, 
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: { 
              email:formData.email
            }
        })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   history.push("/OTP")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    

    
    return (
        <>
            <IonPage>
                <IonHeader>
                </IonHeader>
                <IonContent  fullscreen className='grad '>
                    <form className='forgotPasswordForm' onSubmit={handleSubmit}>
                        <IonText className='center inputHeading'>Forgot Password</IonText> <br></br>

                        <IonLabel className="smallHeading" position="floating">Email*</IonLabel>
                        <IonInput className='textInput' name='email' type='email' required></IonInput>
                        <br></br>

                        <IonLabel className="smallHeading" position="floating">User type*</IonLabel>
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
                        
                        <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Send OTP</IonButton>
                     
                        <br></br>
                        <div className='center'>
                            <button  onClick= {() =>{history.goBack()}}  color="secondary" className='linkLabel puesdorHref'>Back to Login</button>
                        </div>
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

            </>

        )
    }


export default ForgotPassword;


