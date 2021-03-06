import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonToast, IonLoading, IonImg} from '@ionic/react';
import React, {useState} from 'react'
import { ToolBar } from '../../components/toolbar/Toolbar';
import { useEffect } from 'react';




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
    const [loading, setLoading] = useState<boolean>(false);

    

    useEffect(()=>{
        setLoading(true)
        //get employee information 
        setEmail(localStorage.getItem("employee_email"))
        setName(localStorage.getItem("employee_name"))
        setSurname(localStorage.getItem("employee_surname"))
        setUsername(localStorage.getItem("employee_username"))
        setPhone(localStorage.getItem("employee_phone"))
        setGymId(localStorage.getItem("employee_gid"))
        setProfilePicture(localStorage.getItem("employee_profilepicture")!)
        console.log()

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

   
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent>
                    <br></br>
                    <IonGrid>
                        <IonRow>
                            <IonCard class="profileCard" style={{"padding-bottom":"6%"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='5' >
                                            <IonImg  style={{"overflow":"hidden","border-radius":"50%","background-image":`url(${profilePicture})`}} alt="" className="userImage centerComp contain" ></IonImg>
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
                            <IonCol>
                                <IonCard >
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
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="gymCard">
                                    <IonCardContent>
                                        <IonText  className="inputHeading">{gymName}</IonText><br></br>
                                        <i className='smallFont'>{gymLocation}</i>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
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
