import {IonButton, IonInput, IonText} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type props = { handleChange:any, values:any, next:any, prev:any};

export class Contact extends React.Component<props>{

    continue = (e:any) => {
        e.preventDefault();
        this.props.next();
    };

    prev = (e:any)=> {
        e.preventDefault();
        this.props.prev();
    };

    render(){
        return(
            <form className='registerForm' >
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Email*</IonText>
                <IonInput name='email' type='text' className='textInput' required onChange={(e) => this.props.handleChange('email', e)} defaultValue={this.props.values.email}></IonInput><br></br>

                <IonText className="smallHeading">Phone Number*</IonText>
                <IonInput name='number' type='number' className='textInput' required onChange={(e) => this.props.handleChange('number', e)} defaultValue={this.props.values.number}></IonInput><br></br>

                <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.prev}>Previous</IonButton>
                <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.continue}>Next</IonButton>

            </form>
        )
        
    }
}

export default Contact;