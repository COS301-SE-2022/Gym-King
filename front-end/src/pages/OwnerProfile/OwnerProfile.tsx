import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar, IonToast, IonLoading, IonImg, useIonViewDidEnter} from '@ionic/react';
import React, {useRef, useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./OwnerProfile.css";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { validEmail, onlyLettersAndSpaces, onlyAlphanumericAndUnderscore, validPhone } from '../../utils/validation';

interface InternalValues {
    file: any;
}

const OwnerProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    let history=useHistory()


    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername]= useState("")
    const [phone, setPhone]= useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [numGyms, setNumGyms] = useState("");
    const [numEmployees, setNumEmployees] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

    const [errors, setErrors] = useState({
        username: '',
        fullname: '',
        email: '',
        phone: '',
    });

    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const  validate = () => {
        let isValid = true

        if(email && !validEmail(email)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }
        else
            handleError('', 'email');
    
        if(name && onlyLettersAndSpaces(name)) {
            handleError('Please input a valid name', 'fullname');
            isValid = false;
        }
        else
            handleError('', 'fullname');
        
        if(username && !onlyAlphanumericAndUnderscore(username)) {
            handleError('Please input a valid username', 'username');
            isValid = false;
        }
        else
            handleError('', 'username');  

        if(phone && !validPhone(phone)) {
            handleError('Please input a valid phone number', 'phone');
            isValid = false;
        }
        else
            handleError('', 'phone');  

        return isValid;
    }

    useIonViewDidEnter(()=>{
        setPresentingElement(page.current); //for modal
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/owners/owner/info`,{
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
                console.log(response)
                setEmail(response.email);
                setName(response.fullname);
                setPhone( response.number);
                setUsername(response.username);
                setProfilePicture(response.profile_picture)
                localStorage.setItem("pp", response.profile_picture)
                
            })
            .catch(err => {
                console.log(err)
            })
        
        //get number of gyms owned
        
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
            console.log(response)
            if(response != null)
            {
                setNumGyms(response.length)
            }
            
        })
        .catch(err => {
            console.log(err)
        }) 

        //get number of employees
        axios(process.env["REACT_APP_GYM_KING_API"]+`/owners/employees`,{
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
            console.log(response)
            if(response != null)
            {
                setNumEmployees(response.length)
                
            }
        })
        .catch(err => {
            console.log(err)
        }) 

        setLoading(false)
    },[profilePicture])

    const updateEmployeeDetails = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/owners/owner/info`,{

                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: email,
                    fullname: name, 
                    username: username, 
                    number: phone, 
                    apikey: sessionStorage.getItem("key"), 
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                console.log(response)
                //show toast
                
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                //setShowFail(true);
            }) 

        
       
    }


    const dismiss =()=> {
        modal.current?.dismiss();
    }

    const updateDetails = (e:any) =>{
        let isValid = validate()

        if(isValid)
        {
            //update 
            updateEmployeeDetails()
            //dismiss
            dismiss()

            setShowSuccess(true);
        }
        
    }
    
    const updateEmail=(e:any)=>{
        setEmail(e.detail.value)
        localStorage.setItem("email", email)
    }
    const updateName=(e:any)=>{
        setName(e.detail.value)
    }

    const updatePhone=(e:any)=>{
        setPhone(e.detail.value)
    }
    const updateUsername=(e:any)=>{
        setUsername(e.detail.value)
    }
    
    const goToManageGyms = () =>{
        history.push("/ManageGyms")
    }
    const goToManageEmployees = () =>{
        history.push("/ManageEmployees")
    }
    const updateProfilePicture = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/owners/owner/info`,{
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
                console.log(response)
                setProfilePicture(response.profile_picture)
                localStorage.setItem("pp", response.profile_picture)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    //images
    const values =useRef<InternalValues>(
        {
          file: false,
        });
        const onFileChange = (fileChangeEvent: any) => {
            values.current.file = fileChangeEvent.target.files[0];
            submitImage()
          };
        const submitImage = () =>{
            if (!values.current.file) {
                return false;
            }
    
            let formData = new FormData();
            formData.append("email", email)
            formData.append("apikey", sessionStorage.getItem("key")!)
            formData.append('profilepicture', values.current.file, values.current.file.name);
    
            setLoading(true)
            axios(process.env["REACT_APP_GYM_KING_API"]+`/owners/owner/picture`,{
                    "method":"PUT",
                    data: formData
                })
                .then(response =>response.data)
                .then(response =>{
                    console.log(response)
                    updateProfilePicture()
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                }) 
            
        }

        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid style={{"width":"95%"}}>
                        <IonRow>
                            <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${profilePicture})`}} alt="" className="userImage centerComp contain" ></IonImg>
                                            <input style={{"position":"absolute", "opacity":"0%"}} className="userImage centerComp" type="file" accept=".jpg, .png" onChange={(ev) => onFileChange(ev)} />
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText className="PageTitle center un">{username}</IonText>
                                            </IonRow>
                                            <IonRow>
                                                <i className="center">{name}</i>
                                            </IonRow>
                                            
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonRow>
                        <IonRow>
                                <IonCard className="profileCard">
                                    <IonCardHeader className="inputHeading">My Details</IonCardHeader>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol><b>Email</b></IonCol>
                                                <IonCol><IonText>{email}</IonText></IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol><b>Phone Number</b></IonCol>
                                                <IonCol><IonText>{phone}</IonText></IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonButton id="open-modal" expand="block">Edit Details</IonButton>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="smallCard" onClick={goToManageGyms}>
                                    <IonCardContent>
                                        <IonText className="bigNumber">{numGyms}</IonText><br></br>
                                        <IonText>gyms</IonText>
                                    </IonCardContent>
                                    
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="smallCard" onClick={goToManageEmployees}>
                                    <IonCardContent>
                                        <IonText  className="bigNumber">{numEmployees}</IonText><br></br>
                                        <IonText>employees</IonText>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <br></br>

                    <IonModal ref={modal} trigger="open-modal" presentingElement={presentingElement!}>
                        
                        <IonHeader>
                            <IonToolbar mode="ios">
                            <IonButtons slot="start">
                                <IonButton mode="ios" color="light" onClick={dismiss}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Edit Details</IonTitle>
                            <IonButtons slot="end">
                                <IonButton mode="ios" color="warning" onClick={updateDetails} type="submit">Confirm</IonButton>
                            </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent >
                            <form style={{"padding":"5%"}} onChange={updateDetails}>

                                <IonLabel className="smallHeading" position="floating">Username</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required value={username} onIonChange={updateUsername}></IonInput>
                                {errors.username!=="" && (
                                    <>
                                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.username}</IonLabel><br></br>
                                    </>
                                )}
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Full name</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required value={name} onIonChange={updateName}></IonInput>
                                {errors.fullname!=="" && (
                                    <>
                                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.fullname}</IonLabel><br></br>
                                    </>
                                )}
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Email</IonLabel>
                                <IonInput className='textInput' name='email' type='email' required value={email} onIonChange={updateEmail}></IonInput>
                                {errors.email!=="" && (
                                    <>
                                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.email}</IonLabel><br></br>
                                    </>
                                )}
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Phone</IonLabel>
                                <IonInput className='textInput' name='phonenumber' type='text' required value={phone} onIonChange={updatePhone}></IonInput>
                                {errors.phone!=="" && (
                                    <>
                                    <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.phone}</IonLabel><br></br>
                                    </>
                                )}
                                <br></br>
                            </form>
                        </IonContent>
                        
                    </IonModal>
                    <IonToast
                        mode="ios"
                        isOpen={showSuccess}
                        onDidDismiss={() => setShowSuccess(false)}
                        message="Details updated!"
                        duration={1000}
                        color="success"
                    />
                    <IonToast
                        mode="ios"
                        isOpen={showFail}
                        onDidDismiss={() => setShowFail(false)}
                        message="Could not update. Try again later."
                        duration={1000}
                        color="danger"
                    />
                    <IonLoading 
                        mode="ios"
                        isOpen={loading}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default OwnerProfilePage;
