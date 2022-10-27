import {IonContent, IonPage, IonHeader, IonText, IonButton, IonLoading, useIonViewDidEnter, IonItem, IonList, IonLabel, IonAccordion, IonAccordionGroup} from '@ionic/react';
import React, {useState} from 'react';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './ManageEmployees.css';
import { useHistory } from 'react-router-dom';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import axios from "axios";


const ManageEmployees: React.FC = () =>{
    // eslint-disable-next-line
    const [employeeList, setEmployeeList] = useState(new Array())
    // eslint-disable-next-line
    const [gymList, setGymList] = useState(new Array())
    const [loading, setLoading] = useState<boolean>(false);
    let history=useHistory()

    
    useIonViewDidEnter(()=>
    {
        sessionStorage.removeItem("employee_email");
        sessionStorage.removeItem("employee_name");
        sessionStorage.removeItem("employee_surname");
        sessionStorage.removeItem("employee_username");
        sessionStorage.removeItem("employee_phone");
        sessionStorage.removeItem("employee_gid");
        sessionStorage.removeItem("employee_profilepicture");

        var owner=localStorage.getItem('email')
        setLoading(true)

        console.log(owner)
        sessionStorage.setItem("owner_email", owner!)

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
            setEmployeeList(response)
        })
        .catch(err => {
            console.log(err)
         })

         //get the owner's gyms
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
                setGymList(response)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    },[])

    const getEmployeesByGym = (gid:string)=>{
        // eslint-disable-next-line
        let list =  employeeList.filter( (e:any)=>{
            if(e.g_id === gid)
                return e;
        }) 
        return list
    }
    return(
        <IonPage>
            <IonHeader>
                <ToolBar menu={false}></ToolBar>
            </IonHeader>
            <IonContent fullscreen className='Content'>
                <IonText className='PageTitle center'>My Employees</IonText>
                <IonButton mode="ios" routerLink='/AddEmployee' routerDirection="forward" color="warning">Add Employee</IonButton>
                <br></br><br></br>
                <IonAccordionGroup mode="ios">
                {
                    gymList.map((el:any)=>
                        <IonAccordion key={el.g_id} value={el.g_id} mode="ios">
                            <IonItem slot="header" mode="ios">
                                <IonLabel>{el.gym_name}</IonLabel>
                             </IonItem>
                             <IonList slot="content" mode="ios">
                                <EmployeeList list={(getEmployeesByGym(el.g_id))} history={history}></EmployeeList>
                            </IonList>
                        </IonAccordion>
                )}
                </IonAccordionGroup>    
                
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

export default ManageEmployees;
