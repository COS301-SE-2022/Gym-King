import {IonContent, IonPage, IonHeader, IonText, IonButton, IonLoading, useIonViewWillEnter, IonItem, IonList, IonAvatar, IonLabel} from '@ionic/react';
import React, {useState} from 'react';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './ManageEmployees.css';
import { useHistory } from 'react-router-dom';


const ManageEmployees: React.FC = () =>{
    // eslint-disable-next-line
    const [employeeList, setEmployeeList] = useState(new Array())
    const [loading, setLoading] = useState<boolean>(false);
    let history=useHistory()

    
    useIonViewWillEnter(()=>
    {
        var owner=localStorage.getItem('email')
        setLoading(true)

        fetch(`https://gym-king.herokuapp.com/owners/employees/${owner}`, {
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            setEmployeeList(response)

            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
         })
    },[])

    const goToProfile = (email:string, name:string, surname:string, username:string, phone:string, gid:string)=>{
        localStorage.setItem("employee_email", email);
        localStorage.setItem("employee_name", name);
        localStorage.setItem("employee_surname", surname);
        localStorage.setItem("employee_username", username);
        localStorage.setItem("employee_phone",phone);
        localStorage.setItem("employee_gid", gid);
        history.push("/EmployeeProfileView")
    }
    return(
        <IonPage>
            <IonHeader>
                <ToolBar menu={false}></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                <IonText className='PageTitle center'>My Employees</IonText>
                <IonButton routerLink='/AddEmployee' routerDirection="forward" color="warning">Add Employee</IonButton>
                <br></br><br></br>
                <IonList>
                {
                    employeeList?.map(el =>{
                        return(
                            <IonItem  key={el.email}  onClick={() => goToProfile(el.email, el.name, el.surname, el.username, el.number, el.g_id)} >
                                <IonAvatar slot="start">
                                <img src={el.profile_picture} alt=""/>
                                </IonAvatar>
                                <IonLabel>
                                <h2>{el.name} {el.surname}</h2>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
                </IonList>
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

export default ManageEmployees;

