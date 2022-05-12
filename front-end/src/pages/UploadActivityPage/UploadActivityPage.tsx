import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonIcon} from '@ionic/react';
import React, { useState } from 'react'
import FileChooser from '../../components/filechooser/FileChooser';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {shieldOutline} from 'ionicons/icons';
import './UploadActivityPage.css';
import {ActivityInputs} from '../../components/activityInputs/ActivityInputs';
import {claimSchema} from '../../validation/UploadClaimValidation'

export type UploadActivityStates = {act?:any}

const UploadActivityPage: React.FC = () =>{
    
    
    //let badgeId= 1;
    //let  badgeInfo = null;
    //GET REQUEST:
    /*
    const getBadges=()=>{
        fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response);
            badgeInfo= response;
        })
        .catch(err => {console.log(err)})
    } */
        
    //fake generic badge for testing 
    const badge1 = {
        name:'Cycling Champ', 
        description: 'Cycle 10km in 15 minutes to earn this badge!', 
        activityCategory:'cardio',
        activityType:'cycling',
        input1:'00:14:45',
        input2:'10km',
        input3:'4'
    };



    //submit claim 
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    localStorage.setItem( 'e1', "");
    localStorage.setItem( 'e2', "");
    localStorage.setItem( 'e3', "");


   const handleSubmit = async (e:any) =>{
        e.preventDefault();
        let formData={
            i1: e.target.i1.value,
            i2: e.target.i2.value,
            i3: e.target.i3.value,
        };
        console.log(formData);

        if(formData.i1 === null)
            localStorage.setItem( 'e1', "This field is required");
        if(formData.i2 === null)
            localStorage.setItem( 'e2', "This field is required");
        if(formData.i3 === null)
            localStorage.setItem( 'e3', "This field is required");

        const isValid = await claimSchema.isValid(formData);
        setSubmitted(true);
        if(isValid)
        {
            setIsValid(true);
            //handle post request 
        }
        
   }
    
    const updateInputs = (e:any) =>{
        let input = e.target.name;
        let value = e.target.value; 
        if(input === 'i1')
            setInput1(input1 + value);
        else if(input === 'i2')
            setInput2(value);
        else if (input==='i3')
            setInput3(value); 

            console.log(input1,input2,input3);
    }
    
    
        return(
            
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonIcon icon={shieldOutline} className='badge center shadow'></IonIcon>
                    <IonText className='PageTitle center'>{badge1.name}</IonText>
                    <IonText className='SmallDescription center'>{badge1.description}</IonText> <br></br>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading'>Enter your activity details:</IonText>
                        <ActivityInputs activityCategory={badge1.activityCategory} inputs={updateInputs}></ActivityInputs> <br></br>
                        {
                            !isValid && submitted && <IonText className='inputError'>Please enter the required fields</IonText>
                        }
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Proof</IonText>
                            </IonRow>
                        </IonGrid>
                        <FileChooser numFiles={0}></FileChooser>

                        <IonButton class="btnSubmit" type='submit'>SUBMIT</IonButton>
                    </form>
                </IonContent>
            </IonPage>
        )
        
}

export default UploadActivityPage;