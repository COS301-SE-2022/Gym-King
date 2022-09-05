import {IonButton, IonCol, IonGrid, IonInput, IonRow, IonText} from '@ionic/react';
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
                <IonInput name='pwd' type='password' className='textInput' required onChange={(e:any)=>sessionStorage.setItem('regPassword', e.target.pwd.value)} defaultValue={sessionStorage.getItem('regPassword')!}></IonInput><br></br>

                <IonText className="smallHeading">Confirm Password*</IonText>
                <IonInput name='confirmPwd' type='text' className='textInput' required onChange={(e:any)=>sessionStorage.setItem('confirmPassword', e.target.confirmPwd.value)} defaultValue={sessionStorage.getItem('confirmPassword')!}></IonInput><br></br>

                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton color="primary" className=" btnLogin ion-margin-top" style={{"width":"100%", "margin":"0"}} onClick={this.prev}>Previous</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton color="warning" className=" btnLogin ion-margin-top" onClick={this.continue} style={{"width":"100%", "margin":"0"}}>Next</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
        )
        
    }
}

export default Password;