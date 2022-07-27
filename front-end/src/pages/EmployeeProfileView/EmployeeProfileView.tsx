import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonToast, IonLoading, IonImg, useIonViewWillEnter, IonButton} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';




const EmployeeProfileViewPage: React.FC = () =>{
    
    let employee_email = localStorage.getItem("employee_email");
    let employee_pass = localStorage.getItem("employee_pass");
    console.log(employee_email);
    console.log(employee_pass);


    const [email, setEmail] = useState<any>()
    const [name, setName] = useState<any>("")
    const [surname, setSurname]= useState<any>("")
    const [username, setUsername]= useState<any>("")
    const [phone, setPhone]= useState<any>("")
    const [gymId, setGymId] = useState<any>("");
    const [gymName, setGymName] = useState<any>("");
    const [gymLocation, setGymLocation] = useState<any>("");
    const [profilePicture, setProfilePicture] = useState('');


    console.log(gymId);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    

    useIonViewWillEnter(()=>{
        setLoading(true)
        //get employee information 
        setEmail(localStorage.getItem("employee_email"))
        setName(localStorage.getItem("employee_name"))
        setSurname(localStorage.getItem("employee_surname"))
        setUsername(localStorage.getItem("employee_username"))
        setPhone(localStorage.getItem("employee_phone"))
        setGymId(localStorage.getItem("employee_gid"))
        setProfilePicture(localStorage.getItem("employee_profilepicture")!)

        fetch(`https://gym-king.herokuapp.com/gyms/gym/${localStorage.getItem("employee_gid")}`, {
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            setGymName(response.gym_brandname)
            setGymLocation(response.gym_address)
            
                        
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
         })

    },[])

    const deleteEmployee=()=>{
        fetch(`https://gym-king.herokuapp.com/employees/employee`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                owneremail: localStorage.getItem("email"),
                ownerpassword: localStorage.getItem("password"),
                employee_email: localStorage.getItem("employee_email")
            })
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            setShowDeleteEmployee(true)
            setLoading(false)
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
                                                <i className="center">{name} {surname}</i>
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
                            <IonButton onClick={deleteEmployee}>Delete Employee</IonButton>
                        </IonRow>
                        
                    </IonGrid>

                    <br></br>

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
                    <IonToast
                        isOpen={showDeleteEmployee}
                        onDidDismiss={() => setShowSuccess(false)}
                        message="Employee deleted!"
                        duration={1000}
                        color="success"
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

export default EmployeeProfileViewPage;
