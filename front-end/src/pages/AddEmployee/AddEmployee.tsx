import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonToast} from '@ionic/react';
import React, {useState} from 'react';
import './AddEmployee.css';

export const AddEmployee: React.FC = () =>{

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showError1Toast, setShowError1Toast] = useState(false);
    const [showError2Toast, setShowError2Toast] = useState(false);
    let formData : any;

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        formData={
            email: e.target.email.value,
            name: e.target.name.value,
            surname: e.target.surname.value,
            number: e.target.number.value,
            username: e.target.username.value,
            password: e.target.password.value,
            gym: e.target.gym.value,
        };
            createEmployee();
    }
    
    const createEmployee=()=>{
        fetch('', {
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
                password: formData.password,
                gid: formData.gym,
            })
        })
        .then(response =>response.json())
        .then(response =>{
            if(response.results.success)
            {
                setShowSuccessToast(true);

                window.location.href = "http://localhost:3000/AddEmployee";
            }
            else
            {
                console.log(response.results);
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
        <IonPage color='#220FE'>
            <IonHeader>
            </IonHeader>
                <IonContent fullscreen className='Content'>
                    <form onSubmit={handleSubmit} className="registerForm">
                        <IonText className='center inputHeading'>Add Employee</IonText>
                        <br></br>

                        <IonText className="smallHeading">Email*</IonText>
                        <IonInput name='email' type='text' className='textInput' required></IonInput>

                        <IonText className="smallHeading">Name*</IonText>
                        <IonInput name='name' type='text' className='textInput' required></IonInput>

                        <IonText className="smallHeading">Surname*</IonText>
                        <IonInput name='surname' type='text' className='textInput' required></IonInput>

                        <IonText className="smallHeading">Phone Number*</IonText>
                        <IonInput name='number' type='number' className='textInput' required></IonInput>

                        <IonText className="smallHeading"> Username*</IonText>
                        <IonInput name='username' type='text' className='textInput' required></IonInput>

                        <IonText className="smallHeading">Password*</IonText>
                        <IonInput name='password' type='password' className='textInput' required></IonInput>

                        <IonText className="smallHeading">Gym*</IonText>
                        <IonInput name='gym' type='text' className='textInput' required></IonInput>

                        <IonButton color="warning" className="btnAddEmployee ion-margin-top" type="submit" expand="block">Add Employee</IonButton>

                    </form>
                    <br></br>
                    <br></br>
                    <IonToast
                        isOpen={showSuccessToast}
                        onDidDismiss={() => setShowSuccessToast(false)}
                        message = "Employee added successfully!"
                        duration={1000}
                        color="success"
                    />
                    <IonToast
                        isOpen={showError1Toast}
                        onDidDismiss={() => setShowError1Toast(false)}
                        message = "Employee Already Exists."
                        duration={1000}
                        color="danger"
                    />
                    <IonToast
                        isOpen={showError2Toast}
                        onDidDismiss={()=>setShowError2Toast(false)}
                        message="Internal Error. Please try again later."
                        duration ={1000}
                        color="danger"
                    />
                </IonContent>
        </IonPage>
    )
}

export default AddEmployee;
