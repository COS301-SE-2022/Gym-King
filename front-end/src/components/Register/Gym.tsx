import {IonButton, IonCol, IonGrid, IonLoading, IonRow, IonText} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import '../../theme/variables.css'
import DropDown from '../dropdown/dropdown';
import axios from "axios";

//creating a type so props can be entered
export type props = { handleChange:any, next:any, prev:any, };

export const Gym: React.FC<props>  = (props) =>{
    
    const [gymBrands, setGymBrands]= useState(new Array<string>())
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        getBrands()
    },[])

    const getBrands = async() =>{
        let gyms: any[]=[]
        let array: string[]=[]
        await axios.get(process.env["REACT_APP_GYM_KING_API"]+`/brands/brand`)
          .then((response) => response.data)
          .then((response) => {
               gyms = response
          })
          .catch((err) => {
            console.log(err);
          }); 
    
          gyms.forEach(async (el:any)=>{
            array.push(el.gym_brandname)
          })
          setGymBrands(array)
      }
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
            <>
            <form className='registerForm' onSubmit={next}>
                <IonText className='center loginHeading'>REGISTER</IonText>
                <br></br>

                <IonText className="smallHeading">Please select your gym</IonText>
                <DropDown list={gymBrands} chosenValue={chosenValue}></DropDown>

    
                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton mode="ios" color="primary" className=" btnLogin ion-margin-top" style={{"width":"100%", "margin":"0"}} onClick={prev} >PREV</IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton mode="ios" color="warning" className=" btnLogin ion-margin-top" type="submit" style={{"width":"100%", "margin":"0"}}>REG</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
            <IonLoading 
                mode="ios"
                isOpen={loading}
                duration={2000}
                spinner={"circles"}
                onDidDismiss={() => setLoading(false)}
                cssClass={"spinner"}
            />
            </>
        )
        
    }

export default Gym;