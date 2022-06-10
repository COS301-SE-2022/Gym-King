
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonToast} from '@ionic/react';
import React, { useState } from "react";
import './Login.css';


export const Login: React.FC = () =>{
    let formData:any;
    
    const [showToast, setShowToast] = useState(false);
    const loginSubmit= ()=>{
        
        console.log(formData.username)
            fetch('https://gym-king.herokuapp.com/users/login',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: formData.username,
                    password: formData.password
                 })
                })
            .then(response =>response.json())
            .then(response =>{
                if(response.success){
                    window.location.href = "http://"+window.location.host+"/home";
                }else{
                    
                    setShowToast(true);
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {console.log(err)})
    } 

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        formData={
            username: e.target.userName.value,
            password: e.target.userPassword.value
        };
        loginSubmit();
    }
    
    
    return (
            <IonPage >
                <IonContent fullscreen className='Content'>
                    <form action="https://gym-king.herokuapp.com/users/login" onSubmit={handleSubmit} method="POST">
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput name='userName' type='text' ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput name='userPassword' type='password'  ></IonInput>
                    </IonItem>
                    <IonButton className="ion-margin-top" type="submit" expand="block">Login</IonButton>
                    </form>
                </IonContent>

                <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="login failed"
                duration={1000}
                color="danger"
                />
            </IonPage>

            

        )
    }


export default Login;