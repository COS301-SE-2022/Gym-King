import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast} from '@ionic/react';
import FileChooser from '../../components/filechooser/FileChooser';
import ToolBar from '../../components/toolbar/Toolbar';
import React, { useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';
import RadioGroup from '../../components/radioGroup/radioGroup';

//export type CreateBadge = {act?:any}

const CreateBadge: React.FC = () =>{

        const [activityType, setActivityType] = useState('');
        const [gymId, setGymId] = useState('')
        const [submitted, setSubmitted] = useState(false);
        const [isValid, setIsValid] = useState(false);
        const [showToast, setShowToast] = useState(false);
        const [ownedGyms, setOwnedGyms] = useState([]);

        //variables
        let formData:any;

        const handleSubmit = async (e:any) =>{
            e.preventDefault();
                       
            //form validation 
            formData={
                badgeName: e.target.badgeName.value,
                badgeDescription: e.target.badgeDescription.value,
                badgeChallenge:e.target.badgeChallenge.value,
                activityType: activityType,
                gymId: gymId
            };
            const isValid = await createBadgeSchema.isValid(formData);
            setSubmitted(true);

            if(isValid)
            {
                setIsValid(true);
                //handle post request 
                createBadge();
                //show toast
                setShowToast(true);
                //redirect to home page 
                //window.location.href = "http://localhost:3000/home";
            }
        }


        //////////////////POST REQUEST/////////////////////////////
        const createBadge=()=>{
            let gid = gymId;   //temp value for testing 
            let at = activityType.toUpperCase();
            let bn = formData.badgeName;
            let bc = formData.badgeChallenge;
            let bd = formData.badgeDescription;

            fetch(`https://gym-king.herokuapp.com/badges/badge?gid=${gid}&bn=${bn}&bd=${bd}&bc=${bc}&bi=${'BADGE ICON'}&at=${at}`,{
                "method":"POST"
            })
            .then(response =>response.json())
            .then(response =>{
                //successful request
                console.log(response);


            })
            .catch(err => {console.log(err)}) 
        }

        //////// GET OWNED GYMS //////////
        const getOwnedGyms=()=>{
            let gymOwner = "u20519517@tuks.co.za"
            fetch(`https://gym-king.herokuapp.com/gyms/owned?email=${gymOwner}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                //successful request
                //console.log(response.results);
                setOwnedGyms(response.results);

            })
            .catch(err => {console.log(err)}) 
        }
        getOwnedGyms();
        //console.log(ownedGyms);


        const setChosenActivityType = (e:any) =>{
            setActivityType(e)
        }
        const setChosenGymLocation = (e:any) =>{
            console.log(e);
            setGymId(e)
        }
        
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Creating Badge</IonText>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading'>Badge Name:</IonText> <br></br><br></br>
                        <IonInput name='badgeName' type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        <IonText className='inputHeading'>Activity Type:</IonText> <br></br><br></br>
                        <SegmentButton list={['STRENGTH', 'CARDIO']} chosenValue={setChosenActivityType}></SegmentButton><br></br><br></br>


                        <IonText className='inputHeading'>Gym Location:</IonText> <br></br><br></br>
                        <RadioGroup list={ownedGyms} chosenValue={setChosenGymLocation}></RadioGroup><br></br><br></br>

                        <IonText className='inputHeading '>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge" className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription" className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>


                        <IonText className='inputHeading'>Upload Badge Icon:</IonText> <br></br><br></br>
                        <FileChooser numFiles={0}></FileChooser>

                        {
                            !isValid && submitted && <IonText className='inputError'>Please enter the required fields</IonText>
                        }

                        <IonButton class="btnSubmit" type='submit'>CREATE</IonButton>
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