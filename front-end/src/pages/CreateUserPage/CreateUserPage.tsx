import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonToast} from '@ionic/react';
import ToolBar from '../../components/toolbar/Toolbar';
import React, { useState } from 'react';
import { createUerSchema } from '../../validation/CreateBadgeValidation';


 export const CreateUserPage: React.FC = () =>{

        
        const [showToast, setShowToast] = useState(false);
        const [submitted, setSubmitted] = useState(false);
        const [isValid, setIsValid] = useState(false);
        let formData:any;

        
        //SUBMIT THE FORM
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
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Creating User</IonText>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading'>Email:</IonText> <br></br><br></br>
                        <IonInput name='email' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        <IonText className='inputHeading'>Name:</IonText> <br></br><br></br>
                        <IonInput name='name' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>


                        <IonText className='inputHeading'>Surname:</IonText> <br></br><br></br>
                        <IonInput name='surname' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>


                        <IonText className='inputHeading'>Nuber:</IonText> <br></br><br></br>
                        <IonInput name='number' type='number' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        <IonText className='inputHeading'>Username:</IonText> <br></br><br></br>
                        <IonInput name='username' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        <IonText className='inputHeading'>Password:</IonText> <br></br><br></br>
                        <IonInput name='password' type='password' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        {
                            !isValid && submitted && <IonText className='inputError'>Please enter the required fields</IonText>
                        }

                        <IonButton class="btnSubmit" type='submit'>CREATE</IonButton>
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

export default CreateUserPage;