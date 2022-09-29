
import { IonButton, IonContent, IonHeader, IonLabel, IonPage, IonText, IonToast} from '@ionic/react';
import React, { useState } from "react";
import  './OTP.css';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router';


export const OTP: React.FC = () =>{
    // for routing
    let history=useHistory()
    const [showToast, setShowToast] = useState(false);
    //const [correctOTP, setCorrectOTP]= useState("");
    const [enteredOTP, setEnteredOTP] = useState("");

    const [errors, setErrors] = useState({
        otp: ''
    });

    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };


    const verifyOTP = async (e:any) =>{
        let isValid = validate()
        if(isValid)
        {
            sessionStorage.setItem("enteredOTP", enteredOTP)
            history.push('/ResetPassword')
        }
       
    }
    
    const handleChange = async (e:any) =>{
        setEnteredOTP(e);
    }

    const  validate = () => {
        let isValid = true
        let otp =enteredOTP

        if(otp && otp.length!==6) {
            handleError('Please input a valid OTP', 'otp');
            isValid = false;
        }
        else
            handleError('', 'otp');

        return isValid
    }
    
    return (
        <>
            <IonPage>
                <IonHeader>
                </IonHeader>
                <IonContent  fullscreen className='grad loginPage'>
                    <form className='otpForm'>
                        <IonText className='center inputHeading'>Enter OTP</IonText> <br></br>

                        <IonText className='moreInfo center'>We've sent an OTP to your email address. Enter it in below to reset your password.</IonText>
                            <br></br><br></br>
                            <OtpInput
                                value={enteredOTP}
                                onChange={handleChange}
                                numInputs={6}
                                separator={<span></span>}
                                inputStyle={{  
                                    width: '35px',  
                                    height: '35px',  
                                    marginRight: '12px', 
                                    fontSize: '1rem',  
                                    borderRadius: 4, 
                                    color:'white',
                                    fontFamily:"'Comfortaa', cursive",
                                    backgroundColor:'rgba(255,255,255,0.5)',
                                    marginLeft: '13%'
                                }} 
                                containerStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: "center",
                                    alignItems: "center"
                                }}
                            />
                            <br></br>
                            {errors.otp!=="" && (
                                <>
                                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.otp}</IonLabel><br></br>
                                </>
                            )}

                            <br></br>
                            <IonButton mode="ios" onClick={verifyOTP} color="warning" className=" btnLogin ion-margin-top" type="button" expand="block">Next</IonButton>
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
            </IonPage>

            </>

        )
    }


export default OTP;


