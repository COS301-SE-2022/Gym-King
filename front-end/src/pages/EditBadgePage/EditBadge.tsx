import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast, IonLoading, useIonViewDidEnter} from '@ionic/react';
import ToolBar from '../../components/toolbar/Toolbar';
import React, {useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';
import { useHistory } from 'react-router-dom';
import BadgeSlider from '../../components/BadgeSlider/BadgeSlider';


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
        const [loading, setLoading] = useState<boolean>(false);
        const [badgeIcon, setBadgeIcon] = useState('');

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
                };
                
                
                const isValid = await createBadgeSchema.isValid(formData);

                if(isValid)
                {
                    //handle put request 
                    updateBadge();
                    
                }
    
        }

        
        // GET BADGES REQUEST 
        useIonViewDidEnter( ()=>{

            setLoading(true)
            
            sessionStorage.setItem('waiting',"true")
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge/${badgeId}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                setActivityType( response.activitytype)
                setDescription(response.badgedescription)
                setBadgename(response.badgename)
                setChallenge(response.badgechallenge)
                setGymId(response.g_id)
                setBadgeIcon(response.badgeicon)
                console.log(badgeIcon)
                console.log("get: "+response.badgeicon)
                sessionStorage.setItem('bi',response.badgeicon)
                console.log(sessionStorage.getItem("bi"))
                sessionStorage.setItem('waiting',"false")
                setLoading(false)
            })
            .catch(err => {
                sessionStorage.setItem('waiting',"false")
                console.log(err)
                setLoading(false)
            })
        },[badgeId])
    

        // UPDATE BADGE PUT REQUEST 
        const updateBadge= ()=>{
            let at = localStorage.getItem('act');
            let bn = formData.badgeName;
            let bc = formData.badgeChallenge;
            let bd = formData.badgeDescription;
            let bi = localStorage.getItem('badgeIcon');
            
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge`,{
                "method":"PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    bid: badgeId,
                    gid: gymId,
                    badgename: bn,
                    badgedescription: bd,
                    badgechallenge: bc,
                    badgeicon: bi,
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
            
            fetch(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge`,{
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
        
        const changeName = (e:any) =>{
            
            console.log(e.target.value)
            setBadgename(e.target.value)
            
        }
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Edit Badge</IonText>
                    <form onSubmit={handleSubmit} >
                        <IonText className='inputHeading leftMargin'>Badge Name:</IonText> <br></br><br></br>
                        <IonInput onKeyUp={changeName} name='badgeName' type='text' value={badgename} className='textInput centerComp smallerTextBox ' ></IonInput><br></br><br></br>


                        <IonText className='inputHeading leftMargin'>Activity Type:</IonText> <br></br><br></br>
                        <SegmentButton list={['STRENGTH', 'CARDIO']} val={localStorage.getItem('act')} chosenValue={setChosenActivityType} data-testid="segBtn"></SegmentButton><br></br><br></br>


                        <IonText className='inputHeading leftMargin'>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge"  value={badgechallenge} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='inputHeading leftMargin'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription"  value={badgedescription} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <BadgeSlider bIcon={sessionStorage.getItem("bi")!} name = {badgename}></BadgeSlider>
                        
                        <IonButton className=" btnFitWidth  width80 centerComp" color='success' type='submit' >SAVE CHANGES</IonButton>
                        
                    </form>
                    <IonButton className=" btnFitWidth width80 centerComp" color='danger' type='button' onClick={deleteBadge}>DELETE BADGE</IonButton>
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
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        duration={2000}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default EditBadge;
