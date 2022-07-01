import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonToast} from '@ionic/react';
import React, { useState } from 'react';
import { createUerSchema } from '../../validation/CreateUserValidation';
import './Register.css';


 export const RegisterPage: React.FC = () =>{

        
        const [showToast, setShowToast] = useState(false);
        const [submitted, setSubmitted] = useState(false);
        const [isValid, setIsValid] = useState(false);
        let formData:any;

      
        const handleSubmit = async (e:any) =>{
            e.preventDefault();

            //form validation 
            formData={
                email: e.target.email.value,
                name: e.target.name.value,
                surname:e.target.surname.value,
                number: e.target.number.value,
                username: e.target.username.value,
                password:e.target.password.value,
            };
            const isValid = await createUerSchema.isValid(formData);

            setSubmitted(true);
            if(isValid)
            {
                setIsValid(true);
                createUser();
            }
        }


        // CREATE BADGE POST REQUEST 
        const createUser=()=>{

            fetch(`https://gym-king.herokuapp.com/users/user`,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                  email: formData.email,
                  name: formData.name,
                  surname: formData.surname,
                  number: formData.number,
                  username: formData.username,
                  password:formData.password,
               })
              })
            .then(response =>response.json())
            .then(response =>{
                //show toast
                if(response.results.success){
                  setShowToast(true);

                  //redirect to login
                  window.location.href = "http://localhost:3000/Login";
                }else{
                  console.log(response.results);
                }
            })
            .catch(err => {console.log(err)}) 
        }
        
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <form onSubmit={handleSubmit} className="registerForm" >
                        <IonText className='center inputHeading'>Register</IonText>
                        <br></br><br></br>

                        <IonText className="smallHeading">Email:</IonText>
                        <IonInput name='email' type='text' className='textInput' ></IonInput><br></br>

                        <IonText className="smallHeading">Name:</IonText>
                        <IonInput name='name' type='text' className='textInput' ></IonInput><br></br>

                        <IonText className="smallHeading">Username:</IonText>
                        <IonInput name='username' type='text' className='textInput   ' ></IonInput><br></br>

                        <IonText className="smallHeading">Phone Number:</IonText>
                        <IonInput name='number' type='number' className='textInput   ' ></IonInput><br></br>

                    
                        <IonText className="smallHeading">Password:</IonText>
                        <IonInput name='password' type='password' className='textInput   ' ></IonInput><br></br>

                        {
                            !isValid && submitted && <IonText className='inputError'>Please enter the required fields</IonText>
                        }
                        <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Register</IonButton>
                        <br></br>
                        <div className='center'>
                        <IonText className="linkLabel">Already have an account?</IonText><a href="http://localhost:3000/Login" color="secondary" className='linkLabel'>Login</a>
                        </div>
                    </form>
                    <br></br><br></br>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="User Created"
                        duration={1000}
                        color="success"
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default RegisterPage;