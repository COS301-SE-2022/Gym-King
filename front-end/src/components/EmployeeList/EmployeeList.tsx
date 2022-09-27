import {IonAvatar, IonImg, IonItem, IonLabel, IonList} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type Props = {list?:Array<string>, history:any};

export class EmployeeList extends React.Component<Props>{

    goToProfile = (email:string, fullname:string, username:string, phone:string, gid:string, profilePic:string)=>{
        sessionStorage.setItem("employee_email", email);
        sessionStorage.setItem("employee_name", fullname);
        sessionStorage.setItem("employee_username", username);
        sessionStorage.setItem("employee_phone",phone);
        sessionStorage.setItem("employee_gid", gid);
        sessionStorage.setItem("employee_profilepicture", profilePic)
        this.props.history.push("/EmployeeProfileView")
    }

    render(){
        const list = this.props.list!
        return(
                <IonList>
                    {
                        list.map((el:any)=>(
                            <IonItem  key={el.email}  onClick={() => this.goToProfile(el.email, el.fullname, el.username, el.number, el.g_id, el.profile_picture)} >
                                <IonAvatar slot="start">
                                <IonImg src={el.profile_picture} alt=""/>
                                </IonAvatar>
                                <IonLabel>
                                <h2>{el.fullname}</h2>
                                </IonLabel>
                            </IonItem>
                        ))
                    }
                </IonList>
        )
        
    }
}

export default EmployeeList;