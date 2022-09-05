import {IonContent, IonPage, IonHeader, IonToast,} from '@ionic/react';
import React, { useState } from 'react';
import './Register.css';
import RegisterForm from '../../components/Register/RegisterForm';
import { useHistory } from 'react-router-dom';


 export const RegisterPage: React.FC = () =>{

        
        const [showSuccessToast, setShowSuccessToast] = useState(false);
        const [showError1Toast, setShowError1Toast] = useState(false);
        const [showError2Toast, setShowError2Toast] = useState(false);
        let history=useHistory()

        /*
        let formData:any;
        let userInfo = {
            name:string, 
            surname: string, 
            username: string, 
            email:string, 
            phone: string, 
            password:string,
            gym:string
        }

      
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
                gym:""
            };
            createUser();
        
        }


        // CREATE BADGE POST REQUEST 
        const createUser=()=>{
            axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user`,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              data: { 
                  email: formData.email,
                  name: formData.name,
                  surname: formData.surname,
                  number: formData.number,
                  username: formData.username,
                  password:formData.password,
               }
              })
            .then(response =>response.data)
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
        }*/


        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>

                    <RegisterForm history={history}></RegisterForm>

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