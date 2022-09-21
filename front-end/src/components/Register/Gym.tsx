import {IonButton, IonCol, IonGrid, IonRow, IonText} from '@ionic/react';
import React from 'react';
import '../../theme/variables.css'
import DropDown from '../dropdown/dropdown';
//creating a type so props can be entered
export type props = { handleChange:any, next:any, prev:any, };

export const Gym: React.FC<props>  = (props) =>{


    const next = (e:any) => {
        e.preventDefault();
    
        props.next();
    };
    const prev = (e:any)=> {
        e.preventDefault();
        props.prev();
    };

    const chosenValue = (value:any)=>{
        console.log(value);
        sessionStorage.setItem('regGym', value);
    }

        return(
            <form className='registerForm' onSubmit={next}>
                <IonText className='center inputHeading'>Register</IonText>
                <br></br>

                <IonText className="smallHeading">Please select your gym*</IonText>
                <DropDown list={['Virgin Active', 'Planet Fitness', 'Crossfit']} chosenValue={chosenValue}></DropDown>

    
                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton color="primary" className=" btnLogin ion-margin-top" style={{"width":"100%", "margin":"0"}} onClick={prev} >Previous</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton color="warning" className=" btnLogin ion-margin-top" type="submit" style={{"width":"100%", "margin":"0"}}>Register</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
        )
        
    }

export default Gym;