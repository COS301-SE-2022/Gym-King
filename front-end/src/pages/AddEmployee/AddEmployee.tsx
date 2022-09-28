import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonToast, useIonViewDidEnter, IonLoading} from '@ionic/react';
import React, { useState} from 'react';
import { RadioGroup } from '../../components/radioGroup/radioGroup';
import ToolBar from '../../components/toolbar/Toolbar';
import './AddEmployee.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";

export const AddEmployee: React.FC = () =>{

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showError1Toast, setShowError1Toast] = useState(false);
    const [showError2Toast, setShowError2Toast] = useState(false);
    const [ownedGyms, setOwnedGyms] = useState([]);
    const [gymId, setGymId] = useState('')
    const [loading, setLoading] = useState<boolean>(false);

    let history=useHistory()
    let formData : any;

    useIonViewDidEnter(()=>{
        setLoading(true)
        let gymOwner = localStorage.getItem("username")
        axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/getGyms`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                email: localStorage.getItem("email"),
                apikey: sessionStorage.getItem("key")

            })
        })
        .then(response =>response.data)
        .then(response =>{
            setOwnedGyms(response);
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        }) 
    })

    const setChosenGymLocation = (e:any) =>{
        console.log(e);
        setGymId(e)
    }

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        formData={
            email: e.target.email.value,
            name: e.target.name.value,
            number: e.target.number.value,
            username: e.target.username.value,
            password: e.target.password.value,
            gid: gymId,
        };
        createEmployee();
    }
    
    const createEmployee=()=>{
        setLoading(true)
        console.log(formData)
        
        axios(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee`,{
                "method":"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: { 
                    email: formData.email,
                    fullname: formData.name,
                    number: formData.number, 
                    username: formData.username, 
                    password: formData.password,
                    gid: formData.gid
                }
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                //show toast
                setShowSuccessToast(true);

                //redirect to view badges (gym owner) 
                history.goBack();
            })
            .catch(err => {
                setLoading(false)
                setShowError1Toast(true);
                console.log(err)
            }) 
    }

    return(
        <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar ></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content' >
                    <form onSubmit={handleSubmit} >
                        <IonText className='PageTitle center'>Add Employee</IonText>
                        <br></br>

                        <IonText className="smallHeading leftMargin">Email*</IonText>
                        <IonInput name='email' type='text' className='textInput  smallerTextBox leftMargin' required></IonInput><br></br>

                        <IonText className="smallHeading leftMargin">Full name*</IonText>
                        <IonInput name='name' type='text' className='textInput smallerTextBox leftMargin' required></IonInput><br></br>

                        <IonText className="smallHeading leftMargin">Phone Number*</IonText>
                        <IonInput name='number' type='number' className='textInput smallerTextBox leftMargin' required></IonInput><br></br>

                        <IonText className="smallHeading leftMargin"> Username*</IonText>
                        <IonInput name='username' type='text' className='textInput smallerTextBox leftMargin' required></IonInput><br></br>

                        <IonText className="smallHeading leftMargin">Password*</IonText>
                        <IonInput name='password' type='password' className='textInput smallerTextBox leftMargin' required></IonInput><br></br>

                        <IonText className="smallHeading leftMargin">Gym*</IonText>
                        <RadioGroup list={ownedGyms} chosenValue={setChosenGymLocation}></RadioGroup><br></br><br></br>

                        <IonButton mode="ios" color="warning" className="btnAddEmployee width80 centerComp" type="submit" expand="block">Add Employee</IonButton>

                    </form>
                    <br></br>
                    <br></br>
                    <IonToast
                        mode="ios"
                        isOpen={showSuccessToast}
                        onDidDismiss={() => setShowSuccessToast(false)}
                        message = "Employee added successfully!"
                        duration={1000}
                        color="success"
                    />
                    <IonToast
                        mode="ios"
                        isOpen={showError1Toast}
                        onDidDismiss={() => setShowError1Toast(false)}
                        message = "Employee Already Exists."
                        duration={1000}
                        color="danger"
                    />
                    <IonToast
                        mode="ios"
                        isOpen={showError2Toast}
                        onDidDismiss={()=>setShowError2Toast(false)}
                        message="Internal Error. Please try again later."
                        duration ={1000}
                        color="danger"
                    />
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                    />
                </IonContent>
            </IonPage>
    )
}

export default AddEmployee;

