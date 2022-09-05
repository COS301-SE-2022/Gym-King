import {IonButton, IonInput, IonText} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type props = { handleChange:any, values:any, next:any, prev:any};

export class Password extends React.Component<props>{

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

                <IonText className="smallHeading">Password*</IonText>
                <IonInput name='pwd' type='text' className='textInput' required onChange={(e) => this.props.handleChange('password', e)} defaultValue={this.props.values.password}></IonInput><br></br>

                <IonText className="smallHeading">Confirm Password*</IonText>
                <IonInput name='confirmPwd' type='text' className='textInput' required  defaultValue={this.props.values.confirmPassword}></IonInput><br></br>

                <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.prev}>Previous</IonButton>
                <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.continue}>Next</IonButton>

            </form>
        )
        
    }
}

export default Password;