import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar, IonToast, IonLoading, IonImg, useIonViewDidEnter} from '@ionic/react';
import React, {useRef, useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./EmployeeProfile.css";
import axios from "axios";

interface InternalValues {
    file: any;
}


const EmployeeProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername]= useState("")
    const [phone, setPhone]= useState("")
    const [gymName, setGymName] = useState("");
    const [gymAddress, setGymAddress] = useState("");
    const [profilePicture, setProfilePicture] = useState('');

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    




    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);


    useIonViewDidEnter(()=>{
        setPresentingElement(page.current); //for modal
        setLoading(true)
        //get employee information 
        axios(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee/info`,{
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
                setGymName(response.g_id.gym_brandname);
                setGymAddress(response.g_id.gym_address);
                setProfilePicture(response.profile_picture)
                localStorage.setItem("profilepicture", profilePicture)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })

    },[profilePicture])

    const updateEmployeeDetails = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee/info`,{

                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: email,
                    fullname: name, 
                    number: phone, 
                    username: username, 
                    apikey: sessionStorage.getItem("apikey"), 
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                console.log(response)                
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
        //update 
        updateEmployeeDetails()
        //dismiss
        dismiss()

        setShowSuccess(true);
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

    const updateProfilePicture= ()=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee/info`,{
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
            setLoading(false)
            setProfilePicture(response.profile_picture)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
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
                axios(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee/picture`,{
                        "method":"PUT",
                        data: formData
                    })
                    .then(response =>response.data)
                    .then(response =>{
                        console.log(response)
                        updateProfilePicture()
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
                    <IonGrid>
                        <IonRow>
                            <IonCard mode="ios" className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg   style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${profilePicture})`}} alt="" className="userImage centerComp contain"  ></IonImg>
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
                                <IonCard className='profileCard'>
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
                                <IonCard className="profileCard">
                                    <IonCardContent>
                                        <IonText  className="inputHeading">{gymName}</IonText><br></br>
                                        <i className='smallFont'>{gymAddress}</i>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>

                    <IonModal mode="ios" ref={modal} trigger="open-modal" presentingElement={presentingElement!}>
                        
                        <IonHeader>
                            <IonToolbar>
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

                                <IonLabel className="smallHeading" position="floating">Full name</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required value={name} onIonChange={updateName}></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Email</IonLabel>
                                <IonInput className='textInput' name='email' type='email' required value={email} onIonChange={updateEmail}></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Phone</IonLabel>
                                <IonInput className='textInput' name='phonenumber' type='text' required value={phone} onIonChange={updatePhone}></IonInput>

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

export default EmployeeProfilePage;
