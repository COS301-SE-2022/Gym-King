import {IonButton, IonCol, IonGrid, IonInput, IonLabel, IonRow, IonText} from '@ionic/react';
import React, { useState } from 'react'
import '../../theme/variables.css'
import { validPassword, matchingPasswords } from '../../utils/validation';

//creating a type so props can be entered
export type props = { handleChange:any, next:any, prev:any};

export const Password: React.FC<props> = (props) =>{

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });
    
    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const  validate = () => {
        let isValid = true;
        let password = sessionStorage.getItem('regPassword')
        let confirmPassword = sessionStorage.getItem('confirmPassword')

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
            handleError('', 'surname');



        return isValid;
    }

    const next = (e:any) => {
        e.preventDefault();
        sessionStorage.setItem('regPassword', e.target.pwd.value)
        sessionStorage.setItem('confirmPassword', e.target.confirmPwd.value)
        
        let isValid = validate()
        
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
            <form className='registerForm' onSubmit={next}>
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Password*</IonText>
                <IonInput name='pwd' type='password' className='textInput' required ></IonInput>
                {errors.password!=="" && (
                    <>
                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.password}</IonLabel><br></br>
                    </>
                )}
                <br></br>

                <IonText className="smallHeading">Confirm Password*</IonText>
                <IonInput name='confirmPwd' type='password' className='textInput' required ></IonInput>
                {errors.confirmPassword!=="" && (
                    <>
                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.confirmPassword}</IonLabel><br></br>
                    </>
                )}
                <br></br>

                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton color="primary" className=" btnLogin ion-margin-top" style={{"width":"100%", "margin":"0"}} onClick={prev}  >Previous</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" style={{"width":"100%", "margin":"0"}}>Next</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
        )
        
}

export default Password;