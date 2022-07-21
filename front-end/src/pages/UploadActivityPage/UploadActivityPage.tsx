import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonIcon, IonToast, IonLoading, useIonViewWillEnter} from '@ionic/react';
import React, {  useState } from 'react';
import FileChooser from '../../components/filechooser/FileChooser';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {shieldOutline} from 'ionicons/icons';
import './UploadActivityPage.css';
import {ActivityInputs} from '../../components/activityInputs/ActivityInputs';
import {claimSchema} from '../../validation/UploadClaimValidation'
import { useHistory } from 'react-router-dom';


export type UploadActivityStates = {act?:any}

const UploadActivityPage: React.FC = () =>{

        // STATES AND VARIABLES 
        const [isValid, setIsValid] = useState(false);
        const [submitted, setSubmitted] = useState(false);
        let email = localStorage.getItem("email")  
                      
        localStorage.setItem( 'e1', "");
        localStorage.setItem( 'e2', "");
        localStorage.setItem( 'e3', "");
        let formData: any
        const [showToast1, setShowToast1] = useState(false);
        const [b_id, setB_id] = useState('');
        const [badgename, setBadgename] = useState('');
        const [activitytype, setAT] = useState('');
        const [badgedescription, setDescription] = useState('');
        const [loading, setLoading] = useState<boolean>(false);
        const [username, setUsername]=useState("");
        let history=useHistory()


        

        //METHODS 
        const handleSubmit = async (e:any) =>{
            e.preventDefault();
            formData={
                i1: e.target.i1.value,
                i2: e.target.i2.value,
                i3: e.target.i3.value,
            };
            //console.log(formData);

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
               
            }
            
        }
        
        const updateInputs = (e:any) =>{
        
        }

        // GET BADGES GET REQUEST 
        useIonViewWillEnter(()=>{
            let badgeId= sessionStorage.getItem("badgeid");
            setLoading(true)
            fetch(`https://gym-king.herokuapp.com/badges/badge/${badgeId}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                //console.log(response)
                setB_id(response.b_id)
                setAT( response.activitytype)
                setDescription(response.badgechallenge)
                setBadgename(response.badgename)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

            fetch(`https://gym-king.herokuapp.com/users/user/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.json())
            .then(response =>{
                setUsername(response.username);
                setLoading(false);
                
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        })


        // SEND CLAIM POST REQUEST 
        const sendClaim=()=>{
            
            let i1= formData.i1;
            let i2= formData.i2;
            let i3= formData.i3;
            fetch(`https://gym-king.herokuapp.com/claims/claim`,{
                "method":"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    bid: b_id,
                    email: email,
                    username: username,
                    input1: i1,
                    input2: i2,
                    input3: i3,
                    proof: "PROOF"
                })
            })
            .then(response =>response.json())
            .then(response =>{
                //console.log(response);
                setShowToast1(true);
                sessionStorage.removeItem("badgeid")
                history.goBack();
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
                    <IonIcon icon={shieldOutline} className='badge center shadow'></IonIcon>
                    <IonText className='PageTitle center'>{badgename}</IonText>
                    <IonText className='SmallDescription center'>{badgedescription}</IonText> <br></br>
                    <form onSubmit={handleSubmit}>
                        <IonText className='inputHeading center'>Enter your activity details:</IonText>
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
                        <br></br>
                        <IonButton className="btnSubmit centerComp" type='submit' color="warning">SUBMIT</IonButton>
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
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                </IonContent>
            </IonPage>
        )
        
}

export default UploadActivityPage;
