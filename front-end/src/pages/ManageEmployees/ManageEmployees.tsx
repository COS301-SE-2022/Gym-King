import {IonContent, IonPage, IonHeader, IonText, IonButton} from '@ionic/react';
import React, {useEffect} from 'react';
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import {ToolBar} from '../../components/toolbar/Toolbar';
import './ManageEmployees.css';

const EmployeeList=[

]

const ManageEmployees: React.FC = () =>{
    useEffect(()=>
    {
        var email=""
        fetch('')
        .then()
        .then()
        .catch()
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
            </IonContent>
        </IonPage>
    )
}

export default ManageEmployees;
