import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar, IonToast, IonLoading, IonImg, useIonViewDidEnter} from '@ionic/react';
import React, {useRef, useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./OwnerProfile.css";
import { useHistory } from 'react-router-dom';

interface InternalValues {
    file: any;
}

const OwnerProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    let history=useHistory()


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname]= useState("")
    const [username, setUsername]= useState("")
    const [phone, setPhone]= useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [numGyms, setNumGyms] = useState("");
    const [numEmployees, setNumEmployees] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [profilePicture, setProfilePicture] = useState('');





    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);


    useIonViewDidEnter(()=>{
        setPresentingElement(page.current); //for modal
        setLoading(true)
        fetch(`https://gym-king.herokuapp.com/owners/owner/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                setEmail(response.email);
                setName(response.name);
                setSurname( response.surname);
                setPhone( response.number);
                setUsername(response.username);
                setPassword(localStorage.getItem("password")!);
                setProfilePicture(response.profile_picture)
                localStorage.setItem("pp", response.profile_picture)
                
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        
        //get number of gyms owned
        fetch(`https://gym-king.herokuapp.com/gyms/owned/${localStorage.getItem("email")}`,{
            method: 'GET'
        })
        .then(response =>response.json())
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
        fetch(`https://gym-king.herokuapp.com/owners/employees/${localStorage.getItem("email")}`,{
            method: 'GET'
        })
        .then(response =>response.json())
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
    },[profilePicture])

    const updateEmployeeDetails = () =>{
        fetch(`https://gym-king.herokuapp.com/owners/owner/info`,{
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    name: name, 
                    surname: surname, 
                    username: username, 
                    number: phone, 
                    password: localStorage.getItem("password"), 
                })
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                //show toast
                
            })
            .catch(err => {
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
    const updateSurname=(e:any)=>{
        setSurname(e.detail.value)
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
        fetch(`https://gym-king.herokuapp.com/owners/owner/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.json())
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
            formData.append("password", password)
            formData.append('profilepicture', values.current.file, values.current.file.name);
    
            setLoading(true)
            fetch(`https://gym-king.herokuapp.com/owners/owner/picture`,{
                    "method":"PUT",
                    body: formData
                })
                .then(response =>response.json())
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
                    <IonGrid>
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
                                                <i className="center">{name} {surname}</i>
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
                            <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton color="light" onClick={dismiss}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Edit Details</IonTitle>
                            <IonButtons slot="end">
                                <IonButton color="warning" onClick={updateDetails} type="submit">Confirm</IonButton>
                            </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent >
                            <form style={{"padding":"5%"}} onChange={updateDetails}>

                                <IonLabel className="smallHeading" position="floating">Username</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required value={username} onIonChange={updateUsername}></IonInput>

                                <IonLabel className="smallHeading" position="floating">Name</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required value={name} onIonChange={updateName}></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Surname</IonLabel>
                                <IonInput className='textInput' name='surname' type='text' required value={surname}  onIonChange={updateSurname}></IonInput>

                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Email</IonLabel>
                                <IonInput className='textInput' name='email' type='email' required value={email} onIonChange={updateEmail}></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Phone</IonLabel>
                                <IonInput className='textInput' name='phonenumber' type='text' required value={phone} onIonChange={updatePhone}></IonInput>

                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Password</IonLabel>
                                <IonButton className='width21' type="button" >Change Password</IonButton>
                            </form>
                        </IonContent>
                        
                    </IonModal>
                    <IonToast
                        isOpen={showSuccess}
                        onDidDismiss={() => setShowSuccess(false)}
                        message="Details updated!"
                        duration={1000}
                        color="success"
                    />
                    <IonToast
                        isOpen={showFail}
                        onDidDismiss={() => setShowFail(false)}
                        message="Could not update. Try again later."
                        duration={1000}
                        color="danger"
                    />
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default OwnerProfilePage;
