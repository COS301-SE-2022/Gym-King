import {IonButton, IonCol, IonGrid, IonInput, IonLabel, IonRow, IonText} from '@ionic/react';
import React, { useState } from 'react'
import '../../theme/variables.css'
import {validEmail , validPhone} from '../../utils/validation'; 

//creating a type so props can be entered
export type props = { handleChange:any, next:any, prev:any};


export const Contact: React.FC<props> = (props) => {

    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });

    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const validate = () => {
        let isValid = true;

        let email = sessionStorage.getItem('regEmail')
        let phone = sessionStorage.getItem('regNumber')

        if(email && !validEmail(email)) {
          handleError('Please input a valid email', 'email');
          isValid = false;
        }
        else
            handleError('', 'email');
    
        if(phone && !validPhone(phone)) {
            handleError('Please input a valid phone number', 'phone');
            isValid = false;
        }
        else
            handleError('', 'phone');

        return isValid;
    }
    const next = (e:any) => {
        e.preventDefault();

        sessionStorage.setItem('regEmail', e.target.email.value.trim())
        sessionStorage.setItem('regNumber', e.target.number.value)

        let isValid =  validate()
        
        if(isValid)
        {
            props.next();
        }
    };

    const prev = (e:any)=> {
        e.preventDefault();
        props.prev();
    };
        return(
            <form className='registerForm'  onSubmit={next} >
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Email*</IonText>
                <IonInput name='email' type='text' className='textInput' required  value={sessionStorage.getItem('regEmail')!}></IonInput>
                {errors.email!=="" && (
                    <>
                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.email}</IonLabel><br></br>
                    </>
                )}
                <br></br>

                <IonText className="smallHeading">Phone Number*</IonText>
                <IonInput name='number' type='number' className='textInput' required value={sessionStorage.getItem('regNumber')!}></IonInput>
                {errors.phone!=="" && (
                    <>
                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.phone}</IonLabel><br></br>
                    </>
                )}
                

                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton color="primary" className=" btnLogin ion-margin-top" style={{"width":"100%", "margin":"0"}} onClick={prev} >Previous</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" style={{"width":"100%", "margin":"0"}}>Next</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </form>
        )
        
}
export default Contact;