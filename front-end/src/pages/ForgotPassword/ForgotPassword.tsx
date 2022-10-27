
import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonLoading, IonPage, IonSegment, IonSegmentButton, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import { useHistory } from 'react-router';
import axios from "axios";
import { validEmail } from '../../utils/validation';


export const ForgotPassword: React.FC = () =>{
    // for routing
    let history=useHistory()
    let formData:any
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [userType, setUserType] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        usertype: '',
    });

    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const  validate = () => {
        let isValid = true
        let email =formData.email
        let usertype = formData.usertype

        if(email && !validEmail(email)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }
        else
            handleError('', 'email');
    

        if(usertype ==='') {
            handleError('Please select a user type', 'usertype');
            isValid = false;
        }
        else
            handleError('', 'usertype');

        return isValid;
    }
    
    const segmentChanged = (e: any)=>{
        setUserType(e.detail.value);
     }

     const handleSubmit = async (e:any) =>{
        e.preventDefault();

        formData={
            email: e.target.email.value.trim(),
            usertype: userType
        };
        console.log(formData)
        sessionStorage.setItem("enteredEmail", formData.email)
        sessionStorage.setItem("enteredUserType", formData.usertype)
        
        let isValid = validate()
        if(isValid)
        {
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
        
        
        
    }

    const sendUserOTP = () =>{
        setLoading(true)
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
                    setLoading(false)
                    console.log(response)
                   history.push("/OTP")

                }else{
                    setLoading(false)
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    const sendEmployeeOTP = () =>{
        setLoading(true)
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
                    setLoading(false)
                    console.log(response)
                   history.push("/OTP")

                }else{
                    setLoading(false)
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    const sendOwnerOTP = () =>{
        setLoading(true)
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
                    setLoading(false)
                    console.log(response)
                   history.push("/OTP")

                }else{
                    setLoading(false)
                    console.log(response.success)
                    console.log(response.results)
                }
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
                <IonContent  fullscreen className='grad '>
                    <form className='forgotPasswordForm' onSubmit={handleSubmit}>
                        <IonText className=' medHeading ' text-center>FORGOT PASSWORD</IonText><br></br><br></br>

                        <IonLabel className="smallHeading" position="floating">Email</IonLabel>
                        <IonInput className='textInput' name='email' type='text' required></IonInput>
                        {errors.email!=="" && (
                                <>
                                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.email}</IonLabel><br></br>
                                </>
                        )}
                        <br></br>

                        <IonLabel className="smallHeading" position="floating">User type</IonLabel>
                        <IonSegment mode="ios" onIonChange={segmentChanged} className="bottomRightShadow" >
                            <IonSegmentButton mode="ios" value="gym_user">
                                <IonLabel>User</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton mode="ios" value="gym_employee">
                                <IonLabel>Employee</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton mode="ios" value="gym_owner">
                                <IonLabel>Owner</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                        {errors.usertype!=="" && (
                                <>
                                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.usertype}</IonLabel><br></br>
                                </>
                        )}
                        <br></br>
                        <IonButton mode="ios" color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Send OTP</IonButton>
                     
                        <br></br>
                        <div className='center'>
                            <button  onClick= {() =>{history.goBack()}}  color="secondary" className='linkLabel puesdorHref'>Back to Login</button>
                        </div>
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
                    mode="ios"
                    isOpen={loading}
                    duration={2000}
                    spinner={"circles"}
                    onDidDismiss={() => setLoading(false)}
                    cssClass={"spinner"}
                />
            </IonPage>

            </>

        )
    }


export default ForgotPassword;


