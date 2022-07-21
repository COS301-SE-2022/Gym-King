import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar, IonToast, IonLoading} from '@ionic/react';
import React, {useRef, useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./EmployeeProfile.css";
import { useEffect } from 'react';


const EmployeeProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname]= useState("")
    const [username, setUsername]= useState("")
    const [phone, setPhone]= useState("")
    const [gymName, setGymName] = useState("");
    const [gymAddress, setGymAddress] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    




    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);


    useEffect(()=>{
        setPresentingElement(page.current); //for modal
        setLoading(true)
        //get employee information 
        fetch(`https://gym-king.herokuapp.com/employees/employee/info`,{
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
                setGymName(response.g_id.gym_brandname);
                setGymAddress(response.g_id.gym_address);

                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
        /*console.log(gid)
        //get employee's gym name 
        fetch(`https://gym-king.herokuapp.com/gyms/gym/${gid}`,{
                method: 'GET'
            })
            .then(response =>response.json())
            .then(response =>{
                console.log(response)
                
                
            })
            .catch(err => {
                console.log(err)
            })*/
    },[])

    const updateEmployeeDetails = () =>{
        fetch(`https://gym-king.herokuapp.com/employees/employee/info`,{
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
    

        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        <IonRow>
                            <IonCard class="profileCard">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <span className="userImage centerComp"></span>
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
                            <IonCol>
                                <IonCard >
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
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="gymCard">
                                    <IonCardContent>
                                        <IonText  className="inputHeading">{gymName}</IonText><br></br>
                                        <i className='smallFont'>{gymAddress}</i>
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
                                <IonButton color="white" onClick={dismiss}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Edit Details</IonTitle>
                            <IonButtons slot="end">
                                <IonButton color="white" onClick={updateDetails} type="submit">Confirm</IonButton>
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
                                <IonButton className='' type="button" >Change Password</IonButton>
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
