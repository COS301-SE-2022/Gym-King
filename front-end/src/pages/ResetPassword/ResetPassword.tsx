
import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonLoading, IonPage, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import { useHistory } from 'react-router';
import axios from "axios";
import { matchingPasswords, validPassword } from '../../utils/validation';


export const ResetPassword: React.FC = () =>{
    // for routing
    let history=useHistory()
    let formData:any
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);


    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const  validate = () => {
        let isValid = true;
        let password = formData.password
        let confirmPassword = formData.confirmPassword

        if(password && !validPassword(password)) {
            handleError('Must be at least 8 characters with at least  1 uppercase, lowercase, number and symbol.', 'password');
            isValid = false;
        }
        else
            handleError('', 'password');
    
        if(confirmPassword && password && !matchingPasswords(confirmPassword, password)) {
            handleError('Passwords don\'t match.', 'confirmPassword');
            isValid = false;
        }
        else
            handleError('', 'confirmPassword');



        return isValid;
    }

    
    const handleSubmit =  (e:any) =>{
        e.preventDefault();

        formData={
            password: e.target.pwd.value.trim(),
            confirmPassword: e.target.confirmPwd.value.trim()
        };

        let isValid = validate()
        if(isValid)
        {
            sessionStorage.setItem("enteredPassword", formData.password)

            resetPassword()
        }
        
        
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
        setLoading(true)
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/users/user/password`, 
        {
            method: "PUT",
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
                setLoading(false)
                if(response.success){
                    console.log(response)
                   history.push("/Login")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    const resetEmployeePassword = ()=>{
        setLoading(true)
        axios(`${process.env["REACT_APP_GYM_KING_API"]}/employees/employee/password`, 
        {
            method: "PUT",
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
                setLoading(false)

                if(response.success){
                    console.log(response)
                   history.push("/Login")

                }else{
                    
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                setLoading(false)

                console.log(err)
            })
    }

    const resetOwnerPassword = ()=>{

        setLoading(true)

        axios(`${process.env["REACT_APP_GYM_KING_API"]}/owners/owner/password`, 
        {
            method: "PUT",
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
                setLoading(false)

                    console.log(response)
                   history.push("/Login")
            })
            .catch(err => {
                setLoading(false)

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
                        {errors.password!=="" && (
                            <>
                            <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.password}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonText className="smallHeading">Confirm New Password</IonText>
                        <IonInput name='confirmPwd' type='password' className='textInput' required ></IonInput>
                        {errors.confirmPassword!=="" && (
                            <>
                            <IonLabel className="errTsext" style={{"color":"darkorange"}}>{errors.confirmPassword}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonButton mode="ios" color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Reset Password</IonButton>
                        <br></br>
                        <button  onClick= {() =>{history.goBack()}} id = "center" color="secondary" className='puesdorHref centerBtn'>Back</button>
                    </form>
                </IonContent>

                <IonToast
                mode="ios"
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Invalid user details."
                duration={1000}
                color="danger"
                />
                <IonLoading 
                    isOpen={loading}
                    message={"Loading"}
                    duration={2000}
                    spinner={"circles"}
                    onDidDismiss={() => setLoading(false)}
                    cssClass={"spinner"}
                />
            </IonPage>

            </>

        )
    }


export default ResetPassword;


