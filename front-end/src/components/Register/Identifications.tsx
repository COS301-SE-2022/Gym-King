import {IonButton, IonInput, IonText, IonLabel} from '@ionic/react';
import React, { useState } from 'react'
import '../../theme/variables.css'
import { onlyLetters, onlyAlphanumericAndUnderscore } from '../../utils/validation'; 
//creating a type so props can be entered
export type props = { handleChange:any, next:any, history:any};

export const Identifications: React.FC<props> = (props) => {


    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        username: '',
    });


    const handleError = (error:string, input:string) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const  validate = async () => {
        let isValid = true;
        let name = sessionStorage.getItem('regName')
        let surname = sessionStorage.getItem('regSurname')
        let username = sessionStorage.getItem('regUsername')

        if(name && onlyLetters(name)) {
            handleError('Please input a valid name', 'name');
            isValid = false;
        }
        else
            handleError('', 'name');
    
        if(surname && onlyLetters(surname)) {
            handleError('Please input a valid surname', 'surname');
            isValid = false;
        }
        else
            handleError('', 'surname');

        if(username && !onlyAlphanumericAndUnderscore(username)) {
            handleError('Please input a valid username', 'username');
            isValid = false;
        }
        else
            handleError('', 'username');

        return isValid;
    }

    const next = async (e:any) => {
        e.preventDefault();        

        sessionStorage.setItem('regName', e.target.name.value.trim())
        sessionStorage.setItem('regSurname', e.target.surname.value.trim())
        sessionStorage.setItem('regUsername', e.target.username.value.trim())

        let isValid = await validate()
        
        if(isValid)
        {
            props.next();
        }
    
        
    };

    return (
        <form className='registerForm' onSubmit={next}>
            <IonText className='center inputHeading'>Register</IonText>
            <br></br>

            <IonText className="smallHeading">Name*</IonText>
            <IonInput name='name' type='text' className='textInput form-group' required value={sessionStorage.getItem('regName')} ></IonInput>
            {errors.name!=="" && (
                <>
                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.name}</IonLabel><br></br>
                </>
            )}
            <br></br>

            <IonText className="smallHeading">Surname*</IonText>
            <IonInput name='surname' type='text' className='textInput' required  value={sessionStorage.getItem('regSurname')} ></IonInput>
            {errors.surname!=="" && (
                <>
                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.surname}</IonLabel><br></br>
                </>
            )}
            <br></br>

            <IonText className="smallHeading">Username*</IonText>
            <IonInput name='username' type='text' className='textInput' required value={sessionStorage.getItem('regUsername')} ></IonInput>
            {errors.username!=="" && (
                <>
                <IonLabel className="errText" style={{"color":"darkorange"}}>{errors.username}</IonLabel><br></br>
                </>
            )}
            <br></br>
            <IonButton type="submit" color="warning" className=" btnLogin ion-margin-top" >Next</IonButton>
            <br></br> <br></br>
            <div className='center'>
                <IonText className="linkLabel">Already have an account?</IonText><button  onClick= {() =>{props.history.go(-1)}}  color="secondary" className='linkLabel puesdorHref'>Login</button>
            </div>
        </form>
    );
}

export default Identifications;




/*
const Identifications: React.FC<props>=()=>{
    state = {name:'', 
            surname:'', 
            username:'',
        }
    const [name, setName] = useState();

    errors = {
        name: "",
        surname:"",
        username:""
    }
    
    handleUserInput (e:any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        console.log(this.state)
    }

    continue = (e:any) => {
        e.preventDefault();
        this.state.name=e.target.name.value.trim();
        this.state.surname=e.target.surname.value.trim();
        this.state.username=e.target.username.value.trim();
        console.log(this.errors)
        
        if(this.validate())
        {
            sessionStorage.setItem('regName', e.target.name.value.trim())
            sessionStorage.setItem('regSurname', e.target.surname.value.trim())
            sessionStorage.setItem('regUsername', e.target.username.value.trim())
    
            this.props.next();
        }
    
        
    };

    handleSubmit = (e:any)=>{
        e.preventDefault()
        //this.props.next([e.target, "fullName"])
        console.log(e.target.name.value);
        this.props.next([e.target.name.value, e.target.surname.value,e.target.username.value, e.target.email.value, e.target.number.value])
    }

      


    validate(){
        let isValid = true; 

        if(!this.state.name){
            this.errors.name='Please input name'
            isValid = false
        } else if (!onlyLetters(this.state.name)) {
            this.errors.name='Please input a valid name'
            isValid = false
        }
        sessionStorage.setItem('errName', this.errors.name)

        if(!this.state.surname){
            this.errors.surname='Please input surname'
            isValid = false
        } else if (!onlyLetters(this.state.surname)) {
            this.errors.surname='Please input a valid surname'
            isValid = false
        }

        if(!this.state.username){
            this.errors.username='Please input username'
            isValid = false
        } else if (!onlyAlphanumericAndUnderscore(this.state.surname)) {
            this.errors.username='Please input a valid username'
            isValid = false
        }

        return isValid;

    }


    render(){
        return(
            <form className='registerForm' onSubmit={this.continue}>
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Name*</IonText>
                <IonInput name='name' type='text' className='textInput form-group ${this.errorClass(this.state.formErrors.name)}' required value={sessionStorage.getItem('regName')!} onChange={(event) => this.handleUserInput(event)}></IonInput><br></br>
                
                <IonText className="smallHeading">Surname*</IonText>
                <IonInput name='surname' type='text' className='textInput' required  value={sessionStorage.getItem('regSurname')!} onChange={(event) => this.handleUserInput(event)}></IonInput><br></br>

                <IonText className="smallHeading">Username*</IonText>
                <IonInput name='username' type='text' className='textInput' required value={sessionStorage.getItem('regUsername')!} onChange={(event) => this.handleUserInput(event)}></IonInput><br></br>

                <IonButton type="submit" color="warning" className=" btnLogin ion-margin-top" >Next</IonButton>
                <br></br> <br></br>
                <div className='center'>
                    <IonText className="linkLabel">Already have an account?</IonText><button  onClick= {() =>{this.props.history.go(-1)}}  color="secondary" className='linkLabel puesdorHref'>Login</button>
                </div>
            </form>
        )
        
    }
}

export default Identifications;*/