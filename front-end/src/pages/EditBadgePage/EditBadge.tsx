import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonToast, IonLoading, useIonViewDidEnter, IonCol, IonGrid, IonRow, IonLabel} from '@ionic/react';
import ToolBar from '../../components/toolbar/Toolbar';
import React, {useState } from 'react';
import { createBadgeSchema } from '../../validation/CreateBadgeValidation';
import SegmentButton from '../../components/segmentButton/segmentButton';
import { useHistory } from 'react-router-dom';
import BadgeSlider from '../../components/BadgeSlider/BadgeSlider';
import axios from "axios";
import { onlyLettersAndSpaces } from '../../utils/validation';


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
        const [req1, setReq1] = useState(0);
        const [req2, setReq2] = useState(0);
        const [req3, setReq3] = useState(0);

        //VARIABLES
        let formData:any;
        let badgeId= localStorage.getItem("badgeid");
        let tags =""

        //FORM VALIDATION 
        const [errors, setErrors] = useState({
            name: '',
            activitytype:'',
            description: '',
            challenge:'',
            req1:'',
            req2:'',
            req3:'',
            gym:'',

        });
    
        const handleError = (error:string, input:string) => {
            setErrors(prevState => ({...prevState, [input]: error}));
        };
    
        const  validate = () => {
            let isValid = true
            console.log(formData.gymId)
    
            if(formData.badgeName && onlyLettersAndSpaces(formData.badgeName)) {
                handleError('Please input a valid name', 'name');
                isValid = false;
            }
            else
                handleError('', 'name');

            console.log(gymId)
            if(gymId==="") {
                handleError('Please select a gym', 'gym');
                isValid = false;
            }
            else
                handleError('', 'gym');
    
            if(localStorage.getItem('act') ==='') {
                handleError('Please select an activty type', 'activitytype');
                isValid = false;
            }
            else
                handleError('', 'activitytype');


    
            return isValid;
        }

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
                    badgeIcon:badgeIcon,
                    req1: e.target.req1.value,
                    req2: e.target.req2.value,
                    req3: e.target.req3.value
                };
                
                
                const isValid = validate()

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
            axios.get(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge/${badgeId}`)
            .then(response =>response.data)
            .then(response =>{
                setActivityType( response.activitytype)
                setDescription(response.badgedescription)
                setBadgename(response.badgename)
                setChallenge(response.badgechallenge)
                setGymId(response.g_id)
                setBadgeIcon(response.badgeicon)
                setReq1(response.requirement1)
                setReq2(response.requirement2)
                setReq3(response.requirement3)

                sessionStorage.setItem('bi',response.badgeicon)
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
            setLoading(true)
            let at = localStorage.getItem('act');
            let bn = formData.badgeName;
            let bc = formData.badgeChallenge;
            let bd = formData.badgeDescription;
            let bi = localStorage.getItem('badgeIcon');
            let req1 = formData.req1
            let req2 = formData.req2
            let req3 = formData.req3
            
            axios(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge`,{
                "method":"PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key"),
                    bid: badgeId,
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
                 })
            })
            .then(response =>response.data)
            .then(response =>{
                //console.log(response)
                setLoading(false)
                //show toast
                setShowToast(true);

                //redirect to view badges  
                history.goBack()
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            }) 
        } 

        // DELETE BADGE DELETE REQUEST 
        const deleteBadge=()=>{
            setLoading(true)
            axios(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge`,{
                "method":"DELETE",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key"),
                    bid: badgeId
                 })
            })
            .then(response =>response.data)
            .then(response =>{
                //console.log(response);
                setLoading(false)
                //show toast 
                setShowToastDelete(true);

                //redirect to view badges 
                history.goBack(  )
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            }) 
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
                        <IonText className='smallHeading leftMargin10'>Badge Name:</IonText> <br></br><br></br>
                        <IonInput onKeyUp={changeName} name='badgeName' type='text' value={badgename} className='textInput centerComp smallerTextBox ' ></IonInput>
                        {errors.name!=="" && (
                            <>
                            <IonLabel className="errText leftMargin" style={{"color":"darkorange"}}>{errors.name}</IonLabel><br></br>
                            </>
                        )}
                        <br></br><br></br>


                        <IonText className='smallHeading leftMargin10'>Activity Type:</IonText> <br></br><br></br>
                        <SegmentButton list={['STRENGTH', 'CARDIO']} val={localStorage.getItem('act')} chosenValue={setChosenActivityType} data-testid="segBtn"></SegmentButton>
                        {errors.activitytype!=="" && (
                            <>
                            <IonLabel className="errText leftMargin" style={{"color":"darkorange"}}>{errors.activitytype}</IonLabel><br></br>
                            </>
                        )}
                        <br></br><br></br>


                        <IonText className='smallHeading leftMargin10'>Badge Challenge:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeChallenge"  value={badgechallenge} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        <IonText className='smallHeading leftMargin10'>Badge Description:</IonText> <br></br><br></br>
                        <IonTextarea name="badgeDescription"  value={badgedescription} className="centerComp textInput smallerTextBox textarea" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                        {
                            localStorage.getItem('act') && localStorage.getItem("act")==="STRENGTH"
                            &&
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'><i>Weight:</i></IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req1" className="textInput" value={req1}></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin' ><i>Reps:</i></IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req2" className="textInput" value={req2}></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'><i>Sets:</i></IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req3" className="textInput" value={req3}></IonInput>
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
                                        <IonText className='smallHeading leftMargin'><i>Distance:</i></IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req1" className="textInput" value={req1}></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin' ><i>Duration:</i></IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req2" className="textInput"  value={req2}></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonText className='smallHeading leftMargin'><i>Difficulty:</i></IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput type="number" name="req3" className="textInput" value={req2}></IonInput>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        }
                        
                        <br></br>
                        <BadgeSlider bIcon={sessionStorage.getItem("bi")!} name = {badgename}></BadgeSlider>
                        
                        <IonButton mode="ios" className=" btnFitWidth  width80 centerComp" color='success' type='submit' >SAVE CHANGES</IonButton>
                        
                    </form>
                    <IonButton mode="ios" className=" btnFitWidth width80 centerComp" color='danger' type='button' onClick={deleteBadge}>DELETE BADGE</IonButton>
                    <br></br><br></br>
                    <IonToast
                        mode="ios"
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="Badge Updated"
                        duration={500}
                        color="success"
                    />
                    <IonToast
                        mode="ios"
                        isOpen={showToastDelete}
                        onDidDismiss={() => setShowToast(false)}
                        message="Badge Deleted"
                        duration={500}
                        color="success"
                    />
                    <IonLoading 
                        mode="ios"
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
