import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonToast, IonLoading, IonImg, useIonViewDidEnter, IonButton} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const EmployeeProfileViewPage: React.FC = () =>{
    
    //let employee_pass = localStorage.getItem("employee_pass");
    //console.log(employee_email);
    //console.log(employee_pass);
    let history=useHistory()

    //employee details 
    const [email, setEmail] = useState<any>()
    const [name, setName] = useState<any>("")
    const [username, setUsername]= useState<any>("")
    const [phone, setPhone]= useState<any>("")
    const [gymName, setGymName] = useState<any>("");
    const [gymLocation, setGymLocation] = useState<any>("");
    const [profilePicture, setProfilePicture] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    

    useIonViewDidEnter(()=>{
        setLoading(true)
        setEmail(sessionStorage.getItem("employee_email"))
        setName(sessionStorage.getItem("employee_name"))
        setUsername(sessionStorage.getItem("employee_username"))
        setPhone(sessionStorage.getItem("employee_phone"))
        //setGymId(localStorage.getItem("employee_gid"))
        setProfilePicture(sessionStorage.getItem("employee_profilepicture")!)
        console.log(sessionStorage.getItem("employee_gid"))

        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/${sessionStorage.getItem("employee_gid")}`)
        .then(response =>response.data)
        .then(response =>{
            setLoading(false)
            console.log(response)
            setGymName(response.gym_name)
            setGymLocation(response.gym_address)
            
                        
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
         })

    },[])
    
    const handleDelete = ()=>{
        let owner= sessionStorage.getItem("owner_email")!
        let owner_pass= localStorage.getItem("password")!
        let employee_email= sessionStorage.getItem("employee_email")!
        //deleteEmployee
        deleteEmployee(owner, owner_pass, employee_email)
    }

    const deleteEmployee=(owner:string, owner_pass:string, employee_email:string)=>{
        setLoading(true)
        axios(process.env["REACT_APP_GYM_KING_API"]+`/employees/employee`, {

            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                owneremail: owner,
                apikey: sessionStorage.getItem("key"),
                employeeemail: employee_email
            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setShowDeleteEmployee(true)
            setLoading(false)
            history.goBack()
        })
        .catch(err => {
            console.log(err)
            setShowFail(true)
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
                                        <IonCol size='5' >
                                            <IonImg  style={{"overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${profilePicture})`}} alt="" className="userImage centerComp contain" ></IonImg>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonRow>
                                                <IonText className=" un PageTitle center ">{username}</IonText>
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
                                    <IonCardHeader className="inputHeading">Employee Details</IonCardHeader>
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

                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        <IonRow>
                                <IonCard className="profileCard">
                                    <IonCardContent>
                                        <IonText  className="inputHeading">{gymName}</IonText><br></br>
                                        <i className='smallFont'>{gymLocation}</i>
                                    </IonCardContent>
                                </IonCard>
                        </IonRow>
                        <IonRow>
                            <IonButton mode="ios" onClick={handleDelete}>Delete Employee</IonButton>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>

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
                    <IonToast
                        mode="ios"
                        isOpen={showDeleteEmployee}
                        onDidDismiss={() => setShowSuccess(false)}
                        message="Employee deleted!"
                        duration={1000}
                        color="success"
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

export default EmployeeProfileViewPage;
