
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import { useHistory } from 'react-router';
import axios from "axios";


export const ResetPassword: React.FC = () =>{
    // for routing
    let history=useHistory()
    let formData:any
    const [showToast, setShowToast] = useState(false);
    //const [correctOTP, setCorrectOTP]= useState("");


    
    const handleSubmit =  (e:any) =>{
        e.preventDefault();

        formData={
            password: e.target.pwd.value.trim(),
        };
        sessionStorage.setItem("enteredPassword", formData.password)

        resetPassword()
        
    }

    const resetPassword = () =>{
        if(sessionStorage.getItem("enteredUserType") === "gym_user")
        {
            resetUserPassword()
        }
        else if(sessionStorage.getItem("enteredUserType") === "gym_employee")
        {
            resetEmployeePassword()
        }
        else if(sessionStorage.getItem("enteredUserType") === "gym_owner")
        {
            resetOwnerPassword()
        }
    }

    const resetUserPassword = ()=>{
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/users/user/password`, 
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: { 
              email: sessionStorage.getItem("enteredEmail"),
              otp: sessionStorage.getItem("enteredOTP"),
              newpassword: sessionStorage.getItem("enteredPassword"),
            }
        })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   history.push("/Login")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const resetEmployeePassword = ()=>{
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/employees/employee/password`, 
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: { 
              email: sessionStorage.getItem("enteredEmail"),
              otp: sessionStorage.getItem("enteredOTP"),
              newpassword: sessionStorage.getItem("enteredPassword"),
            }
        })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   history.push("/Login")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const resetOwnerPassword = ()=>{
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/owners/owner/password`, 
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: { 
              email: sessionStorage.getItem("enteredEmail"),
              otp: sessionStorage.getItem("enteredOTP"),
              newpassword: sessionStorage.getItem("enteredPassword"),
            }
        })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   history.push("/Login")

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
                <IonContent  fullscreen className='grad loginPage'>
                    <form className='otpForm' onSubmit={handleSubmit}>
                        <IonText className='center inputHeading'>Reset Password</IonText> <br></br>

                        <IonText className="smallHeading">New Password</IonText>
                        <IonInput name='pwd' type='password' className='textInput' required  ></IonInput>
                        <br></br>

                        <IonText className="smallHeading">Confirm New Password</IonText>
                        <IonInput name='confirmPwd' type='password' className='textInput' required ></IonInput>
                        <br></br>

                        <IonButton  color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Reset Password</IonButton>
                        <br></br>
                        <button  onClick= {() =>{history.goBack()}} id = "center" color="secondary" className='puesdorHref centerBtn'>Back</button>
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


export default ResetPassword;


