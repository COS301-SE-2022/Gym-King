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

        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                </IonHeader>
                <IonContent fullscreen className='Content'>

                    <RegisterForm history={history} /*showSuccessToast={setShowSuccessToast(true)} showError1Toast={setShowError1Toast(true)} showError2Toast={setShowError1Toast(true)}*/></RegisterForm>

                    <IonToast
                        mode="ios"
                        isOpen={showSuccessToast}
                        onDidDismiss={() => setShowSuccessToast(false)}
                        message= "Account created successfully!"
                        duration={1000}
                        color="success"
                    />
                    <IonToast
                        mode="ios"
                        isOpen={showError1Toast}
                        onDidDismiss={() => setShowError1Toast(false)}
                        message="User Already Exists."
                        duration={1000}
                        color="danger"
                    />
                    <IonToast
                        mode="ios"
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