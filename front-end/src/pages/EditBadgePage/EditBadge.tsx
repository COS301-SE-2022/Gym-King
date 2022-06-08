import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast} from '@ionic/react';
import ToolBar from '../../components/toolbar/Toolbar';
import React, { useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';


const EditBadge: React.FC = () =>{

        //STATES
        //const [gymId, setGymId] = useState('')
        const [showToast, setShowToast] = useState(false);

        const [badgename, setBadgename] = useState('');
        const [activitytype, setActivityType] = useState('');
        const [badgedescription, setDescription] = useState('');
        const [badgechallenge, setChallenge] = useState('');
        //const [ownedGyms, setOwnedGyms] = useState([]);
        const [isDelete, setIsDelete] = useState(1);

        //VARIABLES
        let formData:any;
        let badgeId= localStorage.getItem("badgeid");
        let count = 0;

        //METHODS 
        const onDelete=()=>{
            setIsDelete(isDelete+1);
        }
        const setChosenActivityType = (e:any) =>{
            localStorage.setItem('act', e);
            console.log(activitytype);
            setActivityType(e)
        }

        /*const setChosenGymLocation = (e:any) =>{
            setGymId(e)
        } */

        const handleSubmit = async (e:any) =>{
            e.preventDefault();

                //form validation 
                formData={
                    badgeName: e.target.badgeName.value,
                    badgeDescription: e.target.badgeDescription.value,
                    badgeChallenge:e.target.badgeChallenge.value,
                    activityType: localStorage.getItem('act'),
                    gymName: 'lttD'
                };
                
                
                const isValid = await createBadgeSchema.isValid(formData);

                if(isValid)
                {
                    //handle put request 
                    updateBadge();
                    
                }
    
        }

        //API REQUESTS 
        
            // GET BADGES REQUEST 
            const getBadges= ()=>{
                count++;
                fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
                    "method":"GET"
                })
                .then(response =>response.json())
                .then(response =>{
                    //console.log(response)
                    //setB_id(response.results[0].b_id)
                    setActivityType( response.results[0].activitytype)
                    setDescription(response.results[0].badgedescription)
                    setBadgename(response.results[0].badgename)
                    setChallenge(response.results[0].badgechallenge)
                    //setG_id(response.results[0].g_id)
                })
                .catch(err => {console.log(err)})
            } 
            if(count === 0)
                getBadges();
        

            // UPDATE BADGE PUT REQUEST 
            const updateBadge= ()=>{
                let gymid= 'lttD'
                let badgeicon = "BADGE ICON"
                let at = localStorage.getItem('act');
                let bn = formData.badgeName;
                let bc = formData.badgeChallenge;
                let bd = formData.badgeDescription;
                
                fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}&gid=${gymid}&bn=${bn}&bd=${bd}&bc=${bc}&bi=${badgeicon}&at=${at}`,{
                    "method":"PUT"
                })
                .then(response =>response.json())
                .then(response =>{
                    //console.log(response)
                    //show toast
                    setShowToast(true);
                    //redirect to home page 
                    window.location.href = "http://localhost:3000/home";
                })
                .catch(err => {console.log(err)}) 
            } 

            //////// GET OWNED GYMS //////////
            /*
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
            //getOwnedGyms();
            //console.log(ownedGyms);
            //////// GET OWNED GYMS //////////
            
            const deleteBadge=()=>{
                let id ='XoD'
                fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${id}`,{
                    "method":"DELETE"
                })
                .then(response =>response.json())
                .then(response =>{
                    //successful request
                    console.log(response);
                })
                .catch(err => {console.log(err)}) 
            } */
        
        
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
                        <SegmentButton list={['STRENGTH', 'CARDIO']} chosenValue={setChosenActivityType}></SegmentButton><br></br><br></br>


                        <IonText className='inputHeading '>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge"  value={badgechallenge} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription"  value={badgedescription} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonButton class=" btnFitWidth" color='success' type='submit' >SAVE CHANGES</IonButton>
                        <IonButton class=" btnFitWidth" color='danger' type='submit' onClick={onDelete}>DELETE BADGE</IonButton>
                    </form>
                    <br></br><br></br>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="Badge Updated"
                        duration={500}
                        color="success"
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default EditBadge;