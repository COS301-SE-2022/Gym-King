import {IonButton, IonInput, IonText} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type props = { handleChange:any, values:any, next:any, history:any};


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
    change = (e:any)=>{
        
    }

    render(){
        return(
            <form className='registerForm' onSubmit={this.handleSubmit}>
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Name*</IonText>
                <IonInput name='name' type='text' className='textInput' required onChange={(e:any)=>sessionStorage.setItem('regName', e.target.name.value)} defaultValue={this.props.values.name}></IonInput><br></br>

                <IonText className="smallHeading">Surname*</IonText>
                <IonInput name='surname' type='text' className='textInput' required  onChange={(e:any)=>sessionStorage.setItem('regSurname', e.target.surname.value)} defaultValue={this.props.values.surname}></IonInput><br></br>

                <IonText className="smallHeading">Username*</IonText>
                <IonInput name='username' type='text' className='textInput' required onChange={(e:any)=>sessionStorage.setItem('regUsername', e.target.username.value)} defaultValue={this.props.values.username}></IonInput><br></br>

                <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.continue}>Next</IonButton>
                <br></br> <br></br>
                <div className='center'>
                    <IonText className="linkLabel">Already have an account?</IonText><button  onClick= {() =>{this.props.history.go(-1)}}  color="secondary" className='linkLabel puesdorHref'>Login</button>
                </div>
            </form>
        )
        
    }
}

export default Identifications;