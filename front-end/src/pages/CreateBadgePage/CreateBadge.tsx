import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast} from '@ionic/react';

import ToolBar from '../../components/toolbar/Toolbar';
import React, { useEffect, useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';
import RadioGroup from '../../components/radioGroup/radioGroup';

import BadgeSlider from '../../components/BadgeSlider/BadgeSlider';
import "./CreateBadge.css";
import { useHistory } from 'react-router-dom';


//export type CreateBadge = {act?:any}

 export const CreateBadge: React.FC = () =>{

        //STATES AND VARIABLES 
        //const [activityType, setActivityType] = useState('');
        const [gymId, setGymId] = useState('')
        const [submitted, setSubmitted] = useState(false);
        const [isValid, setIsValid] = useState(false);
        const [showToast, setShowToast] = useState(false);
        const [ownedGyms, setOwnedGyms] = useState([]);
        let formData:any;
        let history=useHistory()



        //METHODS
        const setChosenActivityType = (e:any) =>{
            localStorage.setItem('act', e);
            //setActivityType(e)
        }
        const setChosenGymLocation = (e:any) =>{
            console.log(e);
            setGymId(e)
        }

        
        //SUBMIT THE FORM
        const handleSubmit = async (e:any) =>{
            e.preventDefault();
            console.log(localStorage.getItem('badgeIcon'))
            //form validation 
            formData={
                badgeName: e.target.badgeName.value,
                badgeDescription: e.target.badgeDescription.value,
                badgeChallenge:e.target.badgeChallenge.value,
                gymId: gymId,
            };
            setSubmitted(true);
            const isValid = await createBadgeSchema.isValid(formData);

            if(isValid)
            {
                //valid form 
                setIsValid(true);

                //post request
                createBadge();
            }
        }


        // CREATE BADGE POST REQUEST 
        const createBadge=()=>{
            let at = localStorage.getItem('act')
            let bn = formData.badgeName;
            let bc = formData.badgeChallenge;
            let bd = formData.badgeDescription;
            let bi = localStorage.getItem('badgeIcon');

 
            fetch(`https://gym-king.herokuapp.com/badges/badge`,{
                "method":"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    gid: gymId,
                    badgename: bn,
                    badgedescription: bd,
                    badgechallenge: bc,
                    badgeicon: bi,
                    activitytype: at,
                })
            })
            .then(response =>response.json())
            .then(response =>{
                //show toast
                setShowToast(true);

                //redirect to view badges (gym owner) 
                history.push("/GymOwner-ViewBadges");
            })
            .catch(err => {console.log(err)}) 
        }

        // OWNED GYMS GET REQUEST 
        useEffect(()=>{
            let gymOwner = localStorage.getItem("email")
            fetch(`https://gym-king.herokuapp.com/gyms/owned/${gymOwner}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                setOwnedGyms(response);

            })
            .catch(err => {console.log(err)}) 
        })

        
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Creating Badge</IonText>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading leftMargin'>Badge Name:</IonText> <br></br><br></br>
                        <IonInput name='badgeName' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Activity Type:</IonText> <br></br><br></br>
                        <SegmentButton  list={['STRENGTH', 'CARDIO']} val={localStorage.getItem('act')} chosenValue={setChosenActivityType}></SegmentButton><br></br><br></br>


                        <IonText className='inputHeading leftMargin'>Gym Location:</IonText> <br></br><br></br>
                        <RadioGroup list={ownedGyms} chosenValue={setChosenGymLocation}></RadioGroup><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge" className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription" className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>


                        <BadgeSlider name = "badgeIcon"></BadgeSlider>

                        {
                            !isValid && submitted && <IonText className='inputError'>Please enter the required fields</IonText>
                        }

                        <IonButton class="btnSubmit centerComp" type='submit' color="tertiary">CREATE</IonButton>
                    </form>
                    <br></br><br></br>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="Badge Created"
                        duration={500}
                        color="success"
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default CreateBadge;
