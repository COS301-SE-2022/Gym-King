import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast, useIonViewDidEnter, IonGrid, IonCol, IonRow, IonLabel, IonChip} from '@ionic/react';

import ToolBar from '../../components/toolbar/Toolbar';
import React, {  useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';
import RadioGroup from '../../components/radioGroup/radioGroup';

import BadgeSlider from '../../components/BadgeSlider/BadgeSlider';
import "./CreateBadge.css";
import { useHistory } from 'react-router-dom';
import axios from "axios";


//export type CreateBadge = {act?:any}

 export const CreateBadge: React.FC = () =>{

        //STATES AND VARIABLES 
        //const [activityType, setActivityType] = useState('');

        const color = "#ffca22"
        const transparent = "#9d9fa669"
        const [gymId, setGymId] = useState('')
        const [submitted, setSubmitted] = useState(false);
        const [isValid, setIsValid] = useState(false);
        const [showToast, setShowToast] = useState(false);
        const [ownedGyms, setOwnedGyms] = useState([]);
        const [badgename, setBadgename] = useState('');
        const [tags, setTags] = useState(new Array<string>());

        let formData:any;
        let history=useHistory()

        //chips 
        const [chipColor0, setChipColor0] = useState(transparent)
        const [chipColor1, setChipColor1] = useState(transparent)
        const [chipColor2, setChipColor2] = useState(transparent)
        const [chipColor3, setChipColor3] = useState(transparent)
        const [chipColor4, setChipColor4] = useState(transparent)
        const [chipColor5, setChipColor5] = useState(transparent)
        const [chipColor6, setChipColor6] = useState(transparent)
        const [chipColor7, setChipColor7] = useState(transparent)
        const [chipColor8, setChipColor8] = useState(transparent)
        const [chipColor9, setChipColor9] = useState(transparent)



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
                req1: e.target.req1.value,
                req2: e.target.req2.value,
                req3: e.target.req3.value
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
            let req1 = formData.req1
            let req2 = formData.req2
            let req3 = formData.req3

             axios(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge`,{
                "method":"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{ 
                    gid: gymId,
                    badgename: bn,
                    badgedescription: bd,
                    badgechallenge: bc,
                    badgeicon: bi,
                    activitytype: at,
                    requirement1: req1,
                    requirement2: req2,
                    requirement3: req3,
                    tags: tags
                }
            })
            .then(response =>response.data)
            .then(response =>{
                //show toast
                setShowToast(true);

                //redirect to view badges (gym owner) 
                history.goBack();
            })
            .catch(err => {console.log(err)}) 
        }

        // OWNED GYMS GET REQUEST 
        useIonViewDidEnter(()=>{
            let gymOwner = localStorage.getItem("email")
            axios.get(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned/${gymOwner}`)
            .then(response =>response.data)
            .then(response =>{
                setOwnedGyms(response);

            })
            .catch(err => {console.log(err)}) 
        })

        const changeName = (e:any) =>{
            
            console.log(e.target.value)
            setBadgename(e.target.value)
            
        }

        const selectTag = (value:string, pos:number)=>{


            switch (pos)
            {
                case 0:
                    if(chipColor0 === color)
                    {
                        setChipColor0(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor0(color)
                        tags.push(value)
                    }
                    break
                case 1:
                    if(chipColor1 === color)
                    {
                        setChipColor1(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor1(color)
                        tags.push(value)
                    }
                    break

                case 2: 
                    if(chipColor2 === color)
                    {
                        setChipColor2(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor2(color)
                        tags.push(value)
                    }
                    break
                case 3:
                    if(chipColor3 === color)
                    {
                        setChipColor3(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor3(color)
                        tags.push(value)
                    }
                    break
                case 4:
                    if(chipColor4 === color)
                    {
                        setChipColor4(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor4(color)
                        tags.push(value)
                    }
                    break
                case 5:
                    if(chipColor5 === color)
                    {
                        setChipColor5(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor5(color)
                        tags.push(value)
                    }
                    break
                case 6:
                    if(chipColor6 === color)
                    {
                        setChipColor6(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor6(color)
                        tags.push(value)
                    }
                    break
                case 7:
                    if(chipColor7 === color)
                    {
                        setChipColor7(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor7(color)
                        tags.push(value)
                    }
                    break
                case 8:
                    if(chipColor8 === color)
                    {
                        setChipColor8(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor8(color)
                        tags.push(value)
                    }
                    break
                case 9:
                    if(chipColor9 === color)
                    {
                        setChipColor9(transparent)
                        setTags(tags.filter(e => e !== value));
                    }
                    else    
                    {
                        setChipColor9(color)
                        tags.push(value)
                    }
                    break


                            
            }

            console.log(tags);

        }
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Creating Badge</IonText>
                    <form onSubmit={handleSubmit} >
                        <IonText className='inputHeading leftMargin'>Badge Name:</IonText> <br></br><br></br>
                        <IonInput name='badgeName' onKeyUp={changeName} type='text' className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Activity Type:</IonText> <br></br><br></br>
                        <SegmentButton  list={['STRENGTH', 'CARDIO']} val={localStorage.getItem('act')} chosenValue={setChosenActivityType}></SegmentButton><br></br><br></br>


                        <IonText className='inputHeading leftMargin'>Gym Location:</IonText> <br></br><br></br>
                        <RadioGroup list={ownedGyms} chosenValue={setChosenGymLocation}></RadioGroup><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge" className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription" className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Requirements:</IonText> <br></br><br></br>

                        {
                            localStorage.getItem('act') && localStorage.getItem("act")==="STRENGTH"
                            &&
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'>Weight:</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req1" className="textInput"></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin' >Reps:</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req2" className="textInput"></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'>Sets:</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req3" className="textInput"></IonInput>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        }
                        {
                            localStorage.getItem('act') && localStorage.getItem("act")==="CARDIO"
                            &&
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'>Distance:</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req1" className="textInput"></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin' >Duration:</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req2" className="textInput"></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'>Level of Difficulty:</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req3" className="textInput"></IonInput>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        }

                        <IonText className='smallHeading leftMargin'>Please select the words that relate to this badge:</IonText>
                        <div>
                            <IonChip onClick={()=>selectTag("Cardio", 0)}  style={{"backgroundColor": chipColor0}} ><IonLabel>Cardio</IonLabel></IonChip>
                            <IonChip onClick={()=>selectTag("Running", 1)}  style={{"backgroundColor": chipColor1}} ><IonLabel>Running</IonLabel></IonChip>
                            <IonChip onClick={()=>selectTag("Treadmil", 2)}  style={{"backgroundColor": chipColor2}} ><IonLabel>Treadmill</IonLabel></IonChip>
                            <IonChip onClick={()=>selectTag("Cycling", 3)}  style={{"backgroundColor": chipColor3}} ><IonLabel>Cycling</IonLabel></IonChip>
                            <IonChip onClick={()=>selectTag("Incline", 4)}  style={{"backgroundColor": chipColor4}} ><IonLabel>Incline</IonLabel></IonChip>
                        </div>
                        <BadgeSlider name = {badgename}></BadgeSlider>

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


