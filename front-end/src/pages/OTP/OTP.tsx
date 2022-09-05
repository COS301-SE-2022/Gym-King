
import { IonButton, IonContent, IonHeader, IonPage, IonText, IonToast} from '@ionic/react';
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

    const generateOTP = () =>{
        //let otp = (Math.floor(1000 + Math.random() * 9000)).toString();
        //setCorrectOTP(otp);
        //SAVE IT SOMEWHERE
    }
    generateOTP();


    const verifyOTP = async (e:any) =>{
       console.log(enteredOTP);
    }
    
    const handleChange = async (e:any) =>{
        setEnteredOTP(e);
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
                                numInputs={4}
                                separator={<span></span>}
                                inputStyle={{  
                                    width: '35px',  
                                    height: '35px',  
                                    marginRight: '12px', 
                                    fontSize: '1rem',  
                                    borderRadius: 4, 
                                    color:'black',
                                    fontFamily:"'Comfortaa', cursive",
                                    backgroundColor:'rgba(255,255,255,0.5)'
                                }} 
                                containerStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: "center",
                                    alignItems: "center"
                                }}
                            />

                            <br></br>
                            <IonButton onClick={verifyOTP} color="warning" className=" btnLogin ion-margin-top" type="button" expand="block">Submit</IonButton>
                            <br></br>
                            <button  onClick= {() =>{history.push("/")}} id = "center" color="secondary" className='puesdorHref centerBtn'>Resend OTP</button>
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


export default OTP;


