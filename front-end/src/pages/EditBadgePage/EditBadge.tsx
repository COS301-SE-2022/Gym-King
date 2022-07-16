import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast} from '@ionic/react';
import ToolBar from '../../components/toolbar/Toolbar';
import React, {useEffect, useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';
import { useHistory } from 'react-router-dom';


const EditBadge: React.FC = () =>{
        const history=useHistory()
        //STATES
        const [gymId, setGymId] = useState('')
        const [showToast, setShowToast] = useState(false);
        const [showToastDelete, setShowToastDelete] = useState(false);
        const [badgename, setBadgename] = useState('');
        const [activitytype, setActivityType] = useState('');
        const [badgedescription, setDescription] = useState('');
        const [badgechallenge, setChallenge] = useState('');
        //const [ownedGyms, setOwnedGyms] = useState([]);

        //VARIABLES
        let formData:any;
        let badgeId= localStorage.getItem("badgeid");

        //METHODS 
        const setChosenActivityType = (e:any) =>{
            localStorage.setItem('act', e);
            console.log(activitytype);
            //setActivityType(e)
        }


        const handleSubmit = async (e:any) =>{
            e.preventDefault();

                //form validation 
                formData={
                    badgeName: e.target.badgeName.value,
                    badgeDescription: e.target.badgeDescription.value,
                    badgeChallenge:e.target.badgeChallenge.value,
                    activityType: localStorage.getItem('act'),
                    gymName: gymId
                };
                
                
                const isValid = await createBadgeSchema.isValid(formData);

                if(isValid)
                {
                    //handle put request 
                    updateBadge();
                    
                }
    
        }

        
        // GET BADGES REQUEST 
        useEffect( ()=>{
            fetch(`https://gym-king.herokuapp.com/badges/badge/${badgeId}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                setActivityType( response.activitytype)
                setDescription(response.badgedescription)
                setBadgename(response.badgename)
                setChallenge(response.badgechallenge)
                setGymId(response.g_id)
            })
            .catch(err => {console.log(err)})
        },[badgeId])
    

        // UPDATE BADGE PUT REQUEST 
        const updateBadge= ()=>{
            let gymid= gymId
            let badgeicon = "BADGE ICON"
            let at = localStorage.getItem('act');
            let bn = formData.badgeName;
            let bc = formData.badgeChallenge;
            let bd = formData.badgeDescription;
            //console.log(formData);
            
            fetch(`https://gym-king.herokuapp.com/badges/badge`,{
                "method":"PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    bid: badgeId,
                    gid: gymid,
                    badgename: bn,
                    badgedescription: bd,
                    badgechallenge: bc,
                    badgeicon: badgeicon,
                    activitytype: at
                 })
            })
            .then(response =>response.json())
            .then(response =>{
                //console.log(response)

                //show toast
                setShowToast(true);

                //redirect to view badges  
                history.goBack()
            })
            .catch(err => {console.log(err)}) 
        } 

        // DELETE BADGE DELETE REQUEST 
        const deleteBadge=()=>{
            
            fetch(`https://gym-king.herokuapp.com/badges/badge`,{
                "method":"DELETE",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    bid: badgeId
                 })
            })
            .then(response =>response.json())
            .then(response =>{
                //console.log(response);
                
                //show toast 
                setShowToastDelete(true);

                //redirect to view badges 
                history.goBack(  )
            })
            .catch(err => {console.log(err)}) 
        } 
        
        
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Edit Badge</IonText>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading'>Badge Name:</IonText> <br></br><br></br>
                        <IonInput name='badgeName' type='text' value={badgename} className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>


                        <IonText className='inputHeading'>Activity Type:</IonText> <br></br><br></br>
                        <SegmentButton list={['STRENGTH', 'CARDIO']} val={localStorage.getItem('act')} chosenValue={setChosenActivityType}></SegmentButton><br></br><br></br>


                        <IonText className='inputHeading '>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge"  value={badgechallenge} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription"  value={badgedescription} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonButton class=" btnFitWidth" color='success' type='submit' >SAVE CHANGES</IonButton>
                        
                    </form>
                    <IonButton class=" btnFitWidth" color='danger' type='button' onClick={deleteBadge}>DELETE BADGE</IonButton>
                    <br></br><br></br>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="Badge Updated"
                        duration={500}
                        color="success"
                    />
                    <IonToast
                        isOpen={showToastDelete}
                        onDidDismiss={() => setShowToast(false)}
                        message="Badge Deleted"
                        duration={500}
                        color="success"
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default EditBadge;
