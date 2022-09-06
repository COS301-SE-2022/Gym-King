import {IonButton, IonCol, IonGrid, IonInput, IonRow, IonText} from '@ionic/react';
import React from 'react'
import '../../theme/variables.css'
//creating a type so props can be entered
export type props = { handleChange:any, next:any, prev:any};

export class Password extends React.Component<props>{

    continue = (e:any) => {
        e.preventDefault();
        sessionStorage.setItem('regPassword', e.target.pwd.value)
        sessionStorage.setItem('confirmPassword', e.target.confirmPwd.value)
        this.props.next();
    };

    prev = (e:any)=> {
        e.preventDefault();
        this.props.prev();
    };

    render(){
        return(
            <form className='registerForm' onSubmit={this.continue}>
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Password*</IonText>
                <IonInput name='pwd' type='password' className='textInput' required  value={sessionStorage.getItem('regPassword')!}></IonInput><br></br>

                <IonText className="smallHeading">Confirm Password*</IonText>
                <IonInput name='confirmPwd' type='text' className='textInput' required  value={sessionStorage.getItem('confirmPassword')!}></IonInput><br></br>

                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton color="primary" className=" btnLogin ion-margin-top" style={{"width":"100%", "margin":"0"}} onClick={this.prev}  >Previous</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" style={{"width":"100%", "margin":"0"}}>Next</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
        )
        
    }
}

export default Password;