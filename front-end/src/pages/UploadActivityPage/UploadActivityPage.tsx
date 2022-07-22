import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonIcon, IonToast, IonLoading, useIonViewWillEnter} from '@ionic/react';
import React, {  useRef, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import {shieldOutline} from 'ionicons/icons';
import './UploadActivityPage.css';
import {ActivityInputs} from '../../components/activityInputs/ActivityInputs';
import {claimSchema} from '../../validation/UploadClaimValidation'
import { useHistory } from 'react-router-dom';

interface InternalValues {
    file: any;
}
export type UploadActivityStates = {act?:any}

const UploadActivityPage: React.FC = () =>{
        
        // STATES AND VARIABLES 
        const [isValid, setIsValid] = useState(false);
        const [submitted, setSubmitted] = useState(false);
        let email = localStorage.getItem("email") 
        localStorage.setItem( 'e1', "");
        localStorage.setItem( 'e2', "");
        localStorage.setItem( 'e3', "");
        let formdata: any
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
            formdata={
                i1: e.target.i1.value,
                i2: e.target.i2.value,
                i3: e.target.i3.value,
            };
            //console.log(formData);

            if(formdata.i1 == null)
                localStorage.setItem( 'e1', "This field is required");
            if(formdata.i2 == null)
                localStorage.setItem( 'e2', "This field is required");
            if(formdata.i3 == null)
                localStorage.setItem( 'e3', "This field is required");

            const isValid = await claimSchema.isValid(formdata);
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
                console.log(username)
                setLoading(false);
                
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        })
        const values =useRef<InternalValues>({
            file: false,
        });
        const onFileChange = (fileChangeEvent: any) => {
            values.current.file = fileChangeEvent.target.files[0];
            submitImage()
        };
        const submitImage = () =>{
            if (!values.current.file) {
                return false;
            }    
        }
        // SEND CLAIM POST REQUEST 
        const sendClaim=()=>{
            let i1= formdata.i1;
            let i2= formdata.i2;
            let i3= formdata.i3;
            let formData = new FormData();
                formData.append("bid", b_id)
                formData.append("email", email!)
                formData.append("password", localStorage.getItem("password")!)
                formData.append("input1", i1)
                formData.append("input2", i2)
                formData.append("input3", i3)
                formData.append('proof', values.current.file, values.current.file.name);
                console.log(formData);
            fetch(`https://gym-king.herokuapp.com/claims/claim`,{
                "method":"POST",
                body: formData
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
                        <input  type="file" accept=".jpg, .png" onChange={(ev) => onFileChange(ev)} />
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
