import {IonContent, IonPage, IonHeader, IonText, IonButton, IonLoading, useIonViewWillEnter} from '@ionic/react';
import React, {useState} from 'react';
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './ManageEmployees.css';

const EmployeeList=[

]

const ManageEmployees: React.FC = () =>{

    const [employeeList, setEmployeeList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);
    
    
    useIonViewWillEnter(()=>
    {
        var email="u19068035@tuks.co.za"
        setLoading(true)
        fetch('https://gym-king.herokuapp.com/employees/employee/info', {
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            setLoading(false)
            let arr=[];
            for(let q = 0; q<response.length; q++)
            {
                arr.push({
                    'email':response[q].email,
                    'name':response[q].name,
                    'surname':response[q].surname,
                    'username': response[q].username,
                    'number': response[q].number,
                    'gym': response[q].gym
                })
            }
            setEmployeeList(arr)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
         })
    },[])
    return(
        <IonPage>
            <IonHeader>
                <ToolBar menu={false}></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                <IonText className='PageTitle center'>My Employees</IonText>
                <IonButton routerLink='/AddEmployee' routerDirection="none" color="warning">Add Employee</IonButton>
                <br></br>
                <IonButton routerLink='/EmployeeProfile' routerDirection="forward" color="warning"> View Employee Profile </IonButton>
                
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
