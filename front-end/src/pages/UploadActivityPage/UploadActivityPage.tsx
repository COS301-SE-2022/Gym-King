import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonIcon, IonToast} from '@ionic/react';
import React, { useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {shieldOutline} from 'ionicons/icons';
import './UploadActivityPage.css';
import {claimSchema} from '../../validation/UploadClaimValidation'
import ActivityInputs from '../../components/ActivityInputs/ActivityInputs';
import FileChooser from '../../components/FileChooser/FileChooser';

export type UploadActivityStates = {act?:any}

const UploadActivityPage: React.FC = () =>{
    
///////////////////////GET REQUEST/////////////////////////
    let badgeId= 'wTs';
    const [b_id, setB_id] = useState('');
    const [badgename, setBadgename] = useState('');
    const [activitytype, setAT] = useState('');
    const [badgedescription, setDescription] = useState('');
    //const [g_id, setG_id] = useState(''); //commented because not used

    const getBadges= ()=>{
        fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            setB_id(response.results[0].b_id)
            setAT( response.results[0].activitytype)
            setDescription(response.results[0].badgechallenge)
            setBadgename(response.results[0].badgename)
            //setG_id(response.results[0].g_id)
        })
        .catch(err => {console.log(err)})
    } 
    getBadges();

///////////////////////////////////////////////////////////

//////////////////POST REQUEST/////////////////////////////
    let email = 'u20519517@tuks.co.za';
    let username= 'Gates';

    const sendClaim=()=>{
        
        let i1= formData.i1;
        let i2= formData.i2;
        let i3= formData.i3;
        fetch(`https://gym-king.herokuapp.com/claims/claim?bid=${b_id}&email=${email}&username=${username}&input1=${i1}&input2=${i2}&input3=${i3}&proof=${'PROOF'}`,{
            "method":"POST"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response);
        })
        .catch(err => {console.log(err)}) 
    }


    //submit claim 
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    localStorage.setItem( 'e1', "");
    localStorage.setItem( 'e2', "");
    localStorage.setItem( 'e3', "");
    let formData: any

    const [showToast1, setShowToast1] = useState(false);
   const handleSubmit = async (e:any) =>{
        e.preventDefault();
        formData={
            i1: e.target.i1.value,
            i2: e.target.i2.value,
            i3: e.target.i3.value,
        };
        console.log(formData);

        if(formData.i1 == null)
            localStorage.setItem( 'e1', "This field is required");
        if(formData.i2 == null)
            localStorage.setItem( 'e2', "This field is required");
        if(formData.i3 == null)
            localStorage.setItem( 'e3', "This field is required");

        const isValid = await claimSchema.isValid(formData);
        setSubmitted(true);
        if(isValid)
        {
            setIsValid(true);
            //handle post request 
            sendClaim();
            setShowToast1(true);

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
                    <IonText className='PageTitle center'>{badgename}</IonText>
                    <IonText className='SmallDescription center'>{badgedescription}</IonText> <br></br>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading'>Enter your activity details:</IonText>
                        <ActivityInputs activityCategory={activitytype} inputs={updateInputs}></ActivityInputs> <br></br>
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
                    <br></br>
                    <br></br>
                    <IonToast
                        isOpen={showToast1}
                        onDidDismiss={() => setShowToast1(false)}
                        message="Your claim has been uploaded."
                        duration={500}
                        color="success"
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default UploadActivityPage;