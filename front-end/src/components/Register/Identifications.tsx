import {IonButton, IonInput, IonText} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type props = { handleChange:any, values:any, next:any};

export class Identifications extends React.Component<props>{

    continue = (e:any) => {
        e.preventDefault();
        this.props.next();
    };

    handleSubmit = (e:any)=>{
        e.preventDefault()
        //this.props.next([e.target, "fullName"])
        console.log(e.target.name.value);
        this.props.next([e.target.name.value, e.target.surname.value,e.target.username.value, e.target.email.value, e.target.number.value])
    }
    

    render(){
        return(
            <form className='registerForm' onSubmit={this.handleSubmit}>
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Name*</IonText>
                <IonInput name='name' type='text' className='textInput' required onChange={(e) => this.props.handleChange('name', e)} defaultValue={this.props.values.name}></IonInput><br></br>

                <IonText className="smallHeading">Surname*</IonText>
                <IonInput name='surname' type='text' className='textInput' required  onChange={(e) => this.props.handleChange('surname', e)} defaultValue={this.props.values.surname}></IonInput><br></br>

                <IonText className="smallHeading">Username*</IonText>
                <IonInput name='username' type='text' className='textInput' required onChange={(e) => this.props.handleChange('username', e)} defaultValue={this.props.values.username}></IonInput><br></br>

                <IonText className="smallHeading">Email*</IonText>
                <IonInput name='email' type='text' className='textInput' required onChange={(e) => this.props.handleChange('email', e)} defaultValue={this.props.values.email}></IonInput><br></br>

                <IonText className="smallHeading">Phone Number*</IonText>
                <IonInput name='number' type='number' className='textInput' required onChange={(e) => this.props.handleChange('number', e)} defaultValue={this.props.values.number}></IonInput><br></br>

                <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.continue}>Next</IonButton>
            </form>
        )
        
    }
}

export default Identifications;