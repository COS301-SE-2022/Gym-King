import { IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonModal, IonTitle, IonToolbar, IonToast, IonLoading, IonImg, useIonViewDidEnter} from '@ionic/react';
import React, {useRef, useState, } from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import "./UserProfile.css";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { onlyAlphanumericAndUnderscore, onlyLettersAndSpaces, validEmail, validPhone } from '../../utils/validation';

interface InternalValues {
    file: any;
}

const UserProfilePage: React.FC = () =>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    let history=useHistory()
    const [loading, setLoading] = useState<boolean>(false);

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername]= useState("")
    const [phone, setPhone]= useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [numClaims, setNumClaims] = useState("");
    const [numBadges, setNumBadges] = useState("");
    const [numFriends, setNumFriends] = useState("");

    const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profile_picture"));

    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);


    //FORM VALIDATION 
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
   
    
    const getNumberOfBadges = () =>{
        setLoading(true)
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/users/owned/${localStorage.getItem("username")}`)
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
                setNumBadges(response.length)
            })
            .catch(err => {
                setLoading(false)
            })
    }
    const getNumberOfClaims = () =>{
        setLoading(false)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/claims`,{
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
                setNumClaims(response.length)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const getNumberofFriends = ()=>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getFriends`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                userEmail: localStorage.getItem("email"),

            })
        })
        .then(response =>response.data)
        .then(response =>{
            setLoading(false)
            console.log(response)
            setNumFriends(response.length)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
            
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
                    apikey: sessionStorage.getItem("key")
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setEmail(response.email);
                setName(response.fullname);
                setPhone( response.number);
                setUsername(response.username);
                setProfilePicture(response.profile_picture)
                sessionStorage.setItem("pp", response.profile_picture)

                setLoading(false);
                
            })
            .catch(err => {
                setLoading(false)
            })
        
        getNumberOfBadges()
        getNumberOfClaims()
        getNumberofFriends()
         // eslint-disable-next-line react-hooks/exhaustive-deps

    },[profilePicture])

    const updateUserDetails = () =>{
        setLoading(true)
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
                    apikey: sessionStorage.getItem("key"), 
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }


    const dismiss =()=> {
        modal.current?.dismiss();
    }

    const updateDetails = (e:any) =>{

        let isValid = validate()
        console.log(isValid)
        if(isValid)
        {
            //update 
            updateUserDetails()
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
                    akikey: sessionStorage.getItem("key")
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
        formData.append("apikey", sessionStorage.getItem("key")!)
        formData.append('profilepicture', values.current.file, values.current.file.name);

        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/picture`,{
                "method":"PUT",
                data: formData
            })
            .then(response =>response.data)
            .then(response =>{
                updateProfilePicture()
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            }) 
        
    }

    const openFriends = ()=>{
        history.push("/FriendsPage")
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
                                                <IonButton mode="ios" id="open-modal" expand="block">Edit Details</IonButton>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        <IonRow>
                                <IonCard className="profileCard" onClick={openFriends}>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="10"><b className="inputHeading">My Friends</b></IonCol>
                                                <IonCol><IonText className="inputHeading">{numFriends}</IonText></IonCol>
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
                               
                            </form>
                        </IonContent>
                        
                    </IonModal>
                    <IonToast
                        mode="ios"
                        isOpen={showSuccess}
                        onDidDismiss={() => setShowSuccess(false)}
                        message="Details updated!"
                        duration={2000}
                        color="success"
                    />
                    <IonToast   
                        mode="ios"
                        isOpen={showFail}
                        onDidDismiss={() => setShowFail(false)}
                        message="Could not update. Try again later."
                        duration={2000}
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

export default UserProfilePage;
