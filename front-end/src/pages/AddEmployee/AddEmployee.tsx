import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonToast, useIonViewDidEnter, IonLoading, IonLabel} from '@ionic/react';
import React, { useState} from 'react';
import { RadioGroup } from '../../components/radioGroup/radioGroup';
import ToolBar from '../../components/toolbar/Toolbar';
import './AddEmployee.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { onlyAlphanumericAndUnderscore, onlyLettersAndSpaces, validEmail, validPassword, validPhone } from '../../utils/validation';

export const AddEmployee: React.FC = () =>{

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showError1Toast, setShowError1Toast] = useState(false);
    const [showError2Toast, setShowError2Toast] = useState(false);
    const [ownedGyms, setOwnedGyms] = useState([]);
    const [gymId, setGymId] = useState('')
    const [loading, setLoading] = useState<boolean>(false);

    let history=useHistory()
    let formData : any;


    const [errors, setErrors] = useState({
        email: '',
        name: '',
        number:'',
        username:'',
        password:'',
        gid:''
    });

    const handleError = (error:string, input:string) => {
        console.log(errors)
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const  validate = () => {
        let isValid = true

        if(formData.email && !validEmail(formData.email)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }
        else
            handleError('', 'email');

        if(formData.name && onlyLettersAndSpaces(formData.name)) {
            handleError('Please input a valid name', 'name');
            isValid = false;
        }
        else
            handleError('', 'name');

        if(formData.phone && !validPhone(formData.phone)) {
            handleError('Please input a valid phone number', 'phone');
            isValid = false;
        }
        else
            handleError('', 'phone');

        if(formData.username && !onlyAlphanumericAndUnderscore(formData.username)) {
            handleError('Please input a valid username', 'username');
            isValid = false;
        }
        else
            handleError('', 'username');

        if(formData.password && !validPassword(formData.password)) {
            handleError('Must be at least 8 characters with at least  1 uppercase, lowercase, number and symbol.', 'password');
            isValid = false;
        }
        else
            handleError('', 'password');

        if(formData.gid ==="") {
            handleError('Please select a gym.', 'gid');
            isValid = false;
        }
        else
            handleError('', 'gid');

        return isValid;
    }

    useIonViewDidEnter(()=>{
        setLoading(true)
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

        let isValid = validate()
        if(isValid)
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
                    ownerEmail: localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key"),
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
                <IonContent fullscreen className='Content' >
                    <form onSubmit={handleSubmit} >
                        <IonText className='PageTitle center'>Add Employee</IonText>
                        <br></br>

                        <IonText className="smallHeading leftMargin10">Email*</IonText>
                        <IonInput name='email' type='text' className='textInput  smallerTextBox centerComp width80' required></IonInput>
                        {errors.email!=="" && (
                            <>
                            <IonLabel className="errText leftMargin10" style={{"color":"darkorange"}}>{errors.email}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonText className="smallHeading leftMargin10">Full name*</IonText>
                        <IonInput name='name' type='text' className='textInput smallerTextBox centerComp width80' required></IonInput>
                        {errors.name!=="" && (
                            <>
                            <IonLabel className="errText leftMargin10" style={{"color":"darkorange"}}>{errors.name}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonText className="smallHeading leftMargin10">Phone Number*</IonText>
                        <IonInput name='number' type='number' className='textInput smallerTextBox centerComp width80' required></IonInput>
                        {errors.number!=="" && (
                            <>
                            <IonLabel className="errText leftMargin10" style={{"color":"darkorange"}}>{errors.number}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonText className="smallHeading leftMargin10"> Username*</IonText>
                        <IonInput name='username' type='text' className='textInput smallerTextBox centerComp width80' required></IonInput>
                        {errors.username!=="" && (
                            <>
                            <IonLabel className="errText leftMargin10" style={{"color":"darkorange"}}>{errors.username}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonText className="smallHeading leftMargin10">Password*</IonText>
                        <IonInput name='password' type='password' className='textInput smallerTextBox centerComp width80' required></IonInput>
                        {errors.password!=="" && (
                            <>
                            <IonLabel className="errText leftMargin10" style={{"color":"darkorange"}}>{errors.password}</IonLabel><br></br>
                            </>
                        )}
                        <br></br>

                        <IonText className="smallHeading leftMargin10">Gym*</IonText>
                        <RadioGroup list={ownedGyms} chosenValue={setChosenGymLocation}></RadioGroup>
                        {errors.gid!=="" && (
                            <>
                            <IonLabel className="errText leftMargin10" style={{"color":"darkorange"}}>{errors.gid}</IonLabel><br></br>
                            </>
                        )}
                        <br></br><br></br>

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
                        mode="ios"
                        isOpen={loading}
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

