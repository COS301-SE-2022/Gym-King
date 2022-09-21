import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonToast, IonLoading, useIonViewDidEnter, IonCol} from '@ionic/react'
import React, {  useEffect, useRef, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './UploadActivityPage.css';
import {ActivityInputs} from '../../components/activityInputs/ActivityInputs';
import {claimSchema} from '../../validation/UploadClaimValidation'
import { useHistory } from 'react-router-dom';
import BadgeImage from '../../components/BadgeImage/BadgeImage';
import axios from "axios";
import * as tf from "@tensorflow/tfjs"
import {Camera,CameraResultType,CameraSource,Photo} from '@capacitor/camera'
import { Directory, Filesystem, WriteFileResult} from '@capacitor/filesystem';
import { Capacitor, Plugins } from '@capacitor/core';
import { VideoRecorderCamera, VideoRecorderPreviewFrame } from '@teamhive/capacitor-video-recorder';
import {MediaFile, VideoCapturePlusOptions, VideoCapturePlus,} from "@ionic-native/video-capture-plus";
import { boolean } from 'yup/lib/locale';
import NNAlert from '../../components/NN_outcome/NN_outcome';
interface LocalFile{
    name:string;
    path:string;
    data:string;
}
interface InternalValues {
    file: any;
}
const IMAGE_DIR='GymKing-media'
export type UploadActivityStates = {act?:any}
const config: VideoRecorderPreviewFrame = {
    id: 'video-record',
    stackPosition: 'front', // 'front' overlays your app', 'back' places behind your app.
    width: 'fill',
    height: 'fill',
    x: 0,
    y: 0,
    borderRadius: 0
};
let categories=['BenchPress_down','BenchPress_up', 'PullUp_down', 'PullUp_up',  'PushUp_down',  'PushUp_up','SitUp_up', 'SitUp_down']
const UploadActivityPage: React.FC = () =>{
    
    const { VideoRecorder } = Plugins;

    const doMediaCapture = async () => {
        await VideoRecorder.initialize({
            camera: VideoRecorderCamera.FRONT, // Can use BACK
            previewFrames: [config]
        });
        VideoRecorder.startRecording();
        const res = await VideoRecorder.stopRecording();
        // The video url is the local file path location of the video output.
            return res.videoUrl;
      };
      const [model,setModel]=useState<any>()  
      const [message,setMessage]=useState<string>("loading")
      const loadModel =async() => {
                setMessage("Loading neural Network")
                setLoading(true)
                console.log("loading model")
                const new_model= await tf.loadLayersModel('./assets/model/trained_modeltjs/model.json');
                setLoading(false)
                setMessage("Loading")
                console.log(new_model)
                setModel(new_model)
        };
    
    const [award,setAward]=useState<boolean>(false)
    const SetAward=async(value:boolean)=>{
        setAward(()=>{
            return value
        })
    }
    const [badgeMessage,setBadgeMessage]=useState<string>("unsuccessful")
    const SetBadgeMessage=async(msg:string)=>{
        setMessage(()=>{
            return msg;
        })
    }
    const [Alert,setAlert]=useState<boolean>(false)
    // STATES AND VARIABLES 
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [Icon,setIcon]=useState<string[]>(["b","cycle"])
    let email = localStorage.getItem("email") 
    localStorage.setItem( 'e1', "");
    localStorage.setItem( 'e2', "");
    localStorage.setItem( 'e3', "");
    let formdata: any
    const [showToast1, setShowToast1] = useState(false);
    const [b_id, setB_id] = useState('');
    const [badgename, setBadgename] = useState('push up gold badge');
    const [badgedescription, setDescription] = useState('5');
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername]=useState("");
    let history=useHistory()
        
        //METHODS 
        const selectImage=async()=>{
            const image=await Camera.getPhoto({
                quality:90,
                allowEditing:true,
                resultType:CameraResultType.Base64,
                source:CameraSource.Camera
            })
            console.log(image)
            if(image){
                saveImage(image)
            }
            
        }
        const saveImage=async(media:Photo)=>{
            const fileName=new Date().getTime()+'.mp4'
            const base64Data=await ToBase64(media) as string
            const savedFile=await Filesystem.writeFile({
                directory:Directory.Data,
                path: `${IMAGE_DIR}/${fileName}`,
                data:base64Data
            })
            console.log('saved:',savedFile)
        }
        const ToBase64=async(photo:Photo)=>
        {
            if (Capacitor.getPlatform()==="hybrid") {
                const file = await Filesystem.readFile({
                  path: String(photo.path)
                });
                return file.data;
              }
              else {
                // Fetch the photo, read as a blob, then convert to base64 format
                const response = await fetch(String(photo.webPath));
                const blob = await response.blob();
            
                return await convertBlobToBase64(blob) as string;
              }
        }
       const convertBlobToBase64 = (blob:Blob) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    const categroize=async(images:ImageData[])=>{
       let predictions=[]
       for(let i=0;i<images.length;i++)
       {
            let tensorImg=tf.browser.fromPixels(images[i]).resizeNearestNeighbor([300, 300]).div(tf.scalar(255)).expandDims();
            let prediction= await model.predict(tensorImg).data();
            let index=0;
            let max=prediction[0]
            for(let i=1;i<prediction.length;i++)
            {
                if(prediction[i]>max)
                {
                    max=prediction[i];
                    index=i;
                }
            }
        console.log(categories[index])
        predictions.push(categories[index])
       } 
       console.log(predictions)
       return predictions
    }
    const determineReps=async(predictions:string[])=>{
        //count reps
        /*
            count if activity matches activity specified and cout if state changed
        */
         let rep_count=0;
         let current_position=predictions[0];
         let activity=badgename.replaceAll(" ","").replaceAll("-","").toUpperCase();
         for(let i=0 ;i<predictions.length;i++)
         {
            if(current_position!==predictions[i]&& activity.includes(predictions[i].replace("_","")[0]))
            {
                rep_count=rep_count+1;
                current_position=predictions[i]
            }
         }
         rep_count=Math.ceil(rep_count/2)
         console.log("rep_count",rep_count)
        
        //determine if badge should be awarded
           let reps_needed=badgedescription.match(/\b\d+\b/g)?.map(Number)
           if(reps_needed)
           {
            if(reps_needed[0]<=rep_count)
            {
                console.log("congrats")
                await SetAward(true)
            }
            else{
                await setBadgeMessage("Isufficient reps. expected "+reps_needed +", but detected : "+rep_count)
                console.log("Isufficient reps. expected "+reps_needed +", but detected : "+rep_count)
                await SetAward(false)
            }
           }
       
    }
    const handleSubmit = async (e:any) =>{
       // saveImage(values.current.file)
        console.log("model:",model)
        setMessage("Calculating")
        setLoading(true)
        console.log("extracting frames")
        await VideoToFrames.getFrames('./assets/video.mp4', VideoToFramesMethod.totalFrames).then(async function (frame:ImageData[]) {
            console.log("running through neural network")
            console.log(frame)
            let predictions=await categroize(frame)
            await determineReps(predictions)
        });
        console.log("done")
    
        setLoading(false)
        setAlert(true)
       // setAlert(true)
    
           /*e.preventDefault();
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
               
            }*/
            
        }
        
        const updateInputs = (e:any) =>{
        
        }
           
        
        // GET BADGES GET REQUEST 
        useIonViewDidEnter(()=>{
            loadModel()
            /*let badgeId= sessionStorage.getItem("badgeid");
            setLoading(true)
            axios.get(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge/${badgeId}`)
            .then(response =>response.data)
            .then(response =>{
                //console.log("rsponse",response)
                setB_id(response.b_id)
                localStorage.setItem("activitytype", response.activitytype)
                setDescription(response.badgechallenge)
                setBadgename(response.badgename)
                setLoading(false)
                setIcon(response.badgeicon.split("_"))
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

            axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/info`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ 
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                })
            })
            .then(response =>response.data)
            .then(response =>{
                setUsername(response.username);
                console.log(username)
                setLoading(false);
                
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        */})
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
       /* const sendClaim=()=>{
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
            axios(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim`,{
                "method":"POST",
                data: formData
            })
            .then(response =>response.data)
            .then(response =>{
                //console.log(response);
                setShowToast1(true);
                sessionStorage.removeItem("badgeid")
                history.goBack();
            })
            .catch(err => {console.log(err)}) 
        }
    */
        const reset= () => {
           setAlert(false)
        }
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonGrid  className="ion-align-items-center">
                        <IonRow className="ion-align-items-center">
                        <IonCol>
                        </IonCol>
                            <IonCol className='ion-align-self-center'>
                                <BadgeImage BadgeEmblem={Icon[1]} Badgerank={Icon[0]} idEmblem="UploadEmblem" idRank='UploadRank'></BadgeImage>
                            </IonCol>
                            <IonCol>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonText className='PageTitle center'>{badgename}</IonText>
                    <IonText className='SmallDescription center'>{badgedescription}</IonText> <br></br>
                    <IonButton onClick={ handleSubmit} className="btnSubmit centerComp" color="warning">TEST NN</IonButton>
                    <IonToast
                        isOpen={showToast1}
                        onDidDismiss={() => setShowToast1(false)}
                        message="Your claim has been uploaded."
                        duration={500}
                        color="success"
                    />
                    <IonLoading 
                        isOpen={loading}
                        message={message}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                    <NNAlert award={award} show={Alert} reset={reset} message={badgeMessage} BadgeEmblem={Icon[1]} Badgerank={Icon[0]} idEmblem="UploadEmblem" idRank='UploadRank'></NNAlert>
                </IonContent>
            </IonPage>
        )
        
}

export default UploadActivityPage;
/*
<form onSubmit={handleSubmit}>
                        <IonText className='inputHeading center'>Enter your activity details:</IonText>
                        <ActivityInputs activityCategory={localStorage.getItem("activitytype")!} inputs={updateInputs}></ActivityInputs> <br></br>
                        {
                            !isValid && submitted && <IonText className='inputError'>Please enter the required fields</IonText>
                        }
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <IonText className='Subheading'>Proof</IonText>
                            </IonRow>
                        </IonGrid>
                        <input  type="file" accept=".jpg, .png, .avi, .mkv, .asf, .wmv, .mp4, .m4v, .mov, .3gp, .vro, .mpg, .mpeg, .mov" onChange={(ev) => onFileChange(ev)} />
                        <br></br>
                        <IonButton className="btnSubmit centerComp" type='submit' color="warning">SUBMIT</IonButton>
                    </form>
                    <IonButton onClick={ handleSubmit} className="btnSubmit centerComp" color="warning">TEST NN4</IonButton>
                    <br></br>
                    <br></br>
*/