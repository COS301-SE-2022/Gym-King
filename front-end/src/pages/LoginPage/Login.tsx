import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonLoading, IonPage, IonSegment, IonSegmentButton, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import './Login.css';
import axios from "axios";
import { validEmail } from '../../utils/validation';

export const Login: React.FC = () =>{
    
    let formData:any;
    let history=useHistory()
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState<boolean>(false);


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


    const loginSubmit= ()=>{
            setLoading(true)
            axios.post(`${process.env["REACT_APP_GYM_KING_API"]}/users/login`, 
            {
                email: formData.email,
                password: formData.password,
                usertype: userType
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response =>response.data)
            .then(response =>{
                if(response.success){
                    console.log(response)
                   // window.location.href = "http://"+window.location.host+"/home";
                   localStorage.setItem("email", formData.email)
                   localStorage.setItem("password", formData.password)
                   localStorage.setItem("usertype",formData.usertype)
                   localStorage.setItem("profile_picture", response.profile_picture)
                   localStorage.setItem("pp", response.profile_picture)

                   setLoading(false)
                   navigate();
                }else{
                    
                    setShowToast1(true);
                    console.log(response.success)
                    console.log(response.results)
                    setLoading(false)
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
            email: e.target.email.value.trim(),
            password: e.target.userPassword.value,
            usertype: userType
        };

        let isValid = validate()
        if(isValid)
        {
            loginSubmit();
        }
        
        
    }
     const segmentChanged = (e: any)=>{
        setUserType(e.detail.value);
     }
    
    
    return (
        
            <IonPage >
                <IonHeader>
                </IonHeader>
                <IonContent  fullscreen className='grad loginPage' >
                    <form onSubmit={handleSubmit} method="POST" className='loginForm' >
                        <IonText className='center inputHeading'>Login</IonText>
                            <br></br><br></br>
                            <IonLabel className="smallHeading" position="floating">Email*</IonLabel>
                            <IonInput className='textInput' name='email' type='text' required></IonInput>
                            {errors.email!=="" && (
                                <>
                                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.email}</IonLabel><br></br>
                                </>
                            )}
                            <br></br>


                            <IonLabel className="smallHeading" position="floating">Password*</IonLabel>
                            <IonInput className='textInput' name='userPassword' type='password' required ></IonInput>
                            <br></br>

                            <IonLabel className="smallHeading" position="floating">User type</IonLabel>
                            <IonSegment mode="ios" onIonChange={segmentChanged} >
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
                            {errors.usertype!=="" && (
                                <>
                                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.usertype}</IonLabel><br></br>
                                </>
                            )}

                            <br></br>
                            <IonButton mode='ios' color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Login</IonButton>
                            <br></br>
                            <div className='center'>
                                <IonText className="linkLabel">Don't have an account?</IonText><button  onClick= {() =>{history.push("/Register")}}  color="secondary" className='linkLabel puesdorHref'>Register</button>
                            </div>
                            <br></br>
                            <button  onClick= {() =>{history.push("/ForgotPassword")}} color="secondary" className='puesdorHref centerBtn'>Forgot Password?</button>
                    </form>
                </IonContent>

                <IonToast
                mode="ios"
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message="Invalid user details."
                duration={1000}
                color="danger"
                />
                <IonToast
                mode="ios"
                isOpen={showToast2}
                onDidDismiss={() => setShowToast2(false)}
                message="Welcome to Gym King."
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
            </IonPage>

            

        )
    }


export default Login;
