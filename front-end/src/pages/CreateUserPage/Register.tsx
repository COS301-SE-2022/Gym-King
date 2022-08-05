import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonToast} from '@ionic/react';
import React, { useState } from 'react';
import './Register.css';


 export const RegisterPage: React.FC = () =>{

        
        const [showSuccessToast, setShowSuccessToast] = useState(false);
        const [showError1Toast, setShowError1Toast] = useState(false);
        const [showError2Toast, setShowError2Toast] = useState(false);
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
                createUser();
        
        }


        // CREATE BADGE POST REQUEST 
        const createUser=()=>{

            fetch(process.env["REACT_APP_GYM_KING_API"]+`/users/user`,{
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
                  setShowSuccessToast(true);

                  //redirect to login
                  window.location.href = "http://localhost:3000/Login";
                }else{
                  console.log( response.results);
                  //code:23505 = user already exists 
                  if(response.results.code ==="23505")
                  {
                    setShowError1Toast(true);
                  }
                  else
                  {
                    setShowError2Toast(true);
                  }
                }
            })
            .catch(err => { 
                console.log(err)
                setShowError2Toast(true);
            }) 
        }
        

        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <form onSubmit={handleSubmit} className="registerForm" >
                        <IonText className='center inputHeading'>Register</IonText>
                        <br></br>

                        <IonText className="smallHeading">Email*</IonText>
                        <IonInput name='email' type='text' className='textInput' required></IonInput><br></br>

                        <IonText className="smallHeading">Name*</IonText>
                        <IonInput name='name' type='text' className='textInput' required ></IonInput><br></br>

                        <IonText className="smallHeading">Surname*</IonText>
                        <IonInput name='surname' type='text' className='textInput' required ></IonInput><br></br>

                        <IonText className="smallHeading">Username*</IonText>
                        <IonInput name='username' type='text' className='textInput' required ></IonInput><br></br>

                        <IonText className="smallHeading">Phone Number*</IonText>
                        <IonInput name='number' type='number' className='textInput' required ></IonInput><br></br>

                        <IonText className="smallHeading">Password*</IonText>
                        <IonInput name='password' type='password' className='textInput' required></IonInput>

                        <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" expand="block">Register</IonButton>
                        <div className='center'>
                        <IonText className="linkLabel">Already have an account?</IonText><a href="http://localhost:3000/Login" color="secondary" className='linkLabel'>Login</a>
                        </div>
                    </form>
                    <br></br><br></br>
                    <IonToast
                        isOpen={showSuccessToast}
                        onDidDismiss={() => setShowSuccessToast(false)}
                        message= "Account created successfully!"
                        duration={1000}
                        color="success"
                    />
                    <IonToast
                        isOpen={showError1Toast}
                        onDidDismiss={() => setShowError1Toast(false)}
                        message="User Already Exists."
                        duration={1000}
                        color="danger"
                    />
                    <IonToast
                        isOpen={showError2Toast}
                        onDidDismiss={() => setShowError2Toast(false)}
                        message="Internal Error. Please try again later."
                        duration={1000}
                        color="danger"
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default RegisterPage;