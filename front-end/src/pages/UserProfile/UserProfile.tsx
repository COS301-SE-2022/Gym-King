import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar, IonToast, IonLoading, IonImg, useIonViewDidEnter} from '@ionic/react';
import React, {useRef, useState, } from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./UserProfile.css";
import { useHistory } from 'react-router-dom';
import axios from "axios";

interface InternalValues {
    file: any;
}

const UserProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    let history=useHistory()
    const [loading, setLoading] = useState<boolean>(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername]= useState("")
    const [phone, setPhone]= useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [numClaims, setNumClaims] = useState("");
    const [numBadges, setNumBadges] = useState("");
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profile_picture"));

    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

   
    
    const getNumberOfBadges = () =>{
        
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/users/owned/${localStorage.getItem("email")}`)
            .then(response =>response.data)
            .then(response =>{
                setNumBadges(response.length)
            })
            .catch(err => {
        })
    }
    const getNumberOfClaims = () =>{
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/users/claims/${localStorage.getItem("email")}`)
            .then(response =>response.data)
            .then(response =>{
                setNumClaims(response.length)
            })
            .catch(err => {
        })
    }

    useIonViewDidEnter(()=>{
        setPresentingElement(page.current); //for modal
        setLoading(true);
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setEmail(response.email);
                setName(response.fullname);
                setPhone( response.number);
                setUsername(response.username);
                setPassword(localStorage.getItem("password")!);
                setProfilePicture(response.profile_picture)
                sessionStorage.setItem("pp", response.profile_picture)

                setLoading(false);
                
            })
            .catch(err => {
                setLoading(false)
            })
        
        getNumberOfBadges()
        getNumberOfClaims()
         // eslint-disable-next-line react-hooks/exhaustive-deps

    },[profilePicture])

    const updateUserDetails = () =>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/info`,{
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
                    password: localStorage.getItem("password"), 
                })
            })
            .then(response =>response.data)
            .then(response =>{
                
            })
            .catch(err => {
            })
    }


    const dismiss =()=> {
        modal.current?.dismiss();
    }

    const updateDetails = (e:any) =>{
        //update 
        updateUserDetails()
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

    const goToUserBadges = () =>{
        history.push("/MyBadge")
    }
    const goToPendingBadges = () =>{
        history.push("/PendingBadges")
    }
    
    const updateProfilePicture = () =>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setProfilePicture(response.profile_picture)
                localStorage.setItem("profile_picture", response.profile_picture!)
                setLoading(false)
            })
            .catch(err => {
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
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/picture`,{
                "method":"PUT",
                data: formData
            })
            .then(response =>response.data)
            .then(response =>{
                updateProfilePicture()
            })
            .catch(err => {
                setLoading(false)
            }) 
        
    }


        return(
            <IonPage >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        <IonRow >
                            <IonCard className="profileCard" style={{"paddingBottom":"2em"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5'>
                                            <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${profilePicture})`}} alt="" className="userImage centerComp contain"  ></IonImg>
                                            <input style={{"position":"absolute", "opacity":"0%"}} className="userImage centerComp" type="file" accept=".jpg, .png" onChange={(ev) => onFileChange(ev)} />
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText color="light" className="PageTitle center un">{username}</IonText>
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
                                <IonCard className="profileCard" >
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
                        <IonRow >
                            <IonCol>
                                <IonCard className="smallCard" onClick={goToUserBadges} >
                                    <IonCardContent>
                                        <IonText className="bigNumber">{numBadges}</IonText><br></br>
                                        <IonText>badges</IonText>
                                    </IonCardContent>
                                    
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="smallCard" onClick={goToPendingBadges}>
                                    <IonCardContent>
                                        <IonText  className="bigNumber">{numClaims}</IonText><br></br>
                                        <IonText>pending badges</IonText>
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

                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Name</IonLabel>
                                <IonInput className='textInput' name='name' type='text' required value={name} onIonChange={updateName}></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Email</IonLabel>
                                <IonInput className='textInput' name='email' type='email' required value={email} onIonChange={updateEmail}></IonInput>
                                
                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Phone</IonLabel>
                                <IonInput className='textInput' name='phonenumber' type='text' required value={phone} onIonChange={updatePhone}></IonInput>

                                <br></br>
                                <IonLabel className="smallHeading" position="floating">Password</IonLabel><br></br>
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
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
            </IonPage>
        )
        

}

export default UserProfilePage;
