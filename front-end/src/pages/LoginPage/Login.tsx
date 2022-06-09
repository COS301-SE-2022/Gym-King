
import { IonButton, IonContent,  IonHeader, IonInput, IonPage, IonText} from '@ionic/react';
import React from "react";
import ToolBar from '../../components/toolbar/Toolbar';
import './Login.css';



//===============================================================================================================================================//
//DEVICE TYPE FUNCTIONS
//===============================================================================================================================================//


const Login: React.FC = () => {


    return (
        
    
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <IonContent fullscreen className='Content'>
              
                <IonText className='inputHeading'>Username:</IonText> <br></br><br></br>
                <IonInput name='userName' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>
              
                <IonText className='inputHeading'>Password:</IonText> <br></br><br></br>
                <IonInput name='userPassword' type='password' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                <IonButton class="btnSubmit" type='submit'>Login</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Login;