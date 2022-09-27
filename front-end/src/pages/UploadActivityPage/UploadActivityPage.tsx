import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonToast, IonLoading, useIonViewDidEnter, IonCol} from '@ionic/react'
import React, {  useRef, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './UploadActivityPage.css';
import { useHistory } from 'react-router-dom';
import BadgeImage from '../../components/BadgeImage/BadgeImage';
import axios from "axios";
import * as tf from "@tensorflow/tfjs"
import { Directory, Filesystem} from '@capacitor/filesystem';
import { Capacitor, Plugins } from '@capacitor/core';
import NNAlert from '../../components/NN_outcome/NN_outcome';
import {  VideoRecorderCamera, VideoRecorderPreviewFrame } from '@teamhive/capacitor-video-recorder';
import '@teamhive/capacitor-video-recorder';
import './index'
import { LayersModel } from '@tensorflow/tfjs';
import fetch from 'node-fetch';
const config: VideoRecorderPreviewFrame = {
    id: 'video-record',
    stackPosition: 'front', // 'front' overlays your app', 'back' places behind your app.
    width: 'fill',
    height: 'fill',
    x: 0,
    y: 0,
    borderRadius: 0
};

interface InternalValues {
    file: any;
}
const IMAGE_DIR='GymKing-media'
export type UploadActivityStates = {act?:any}

let categories=['BenchPress_down','BenchPress_up', 'PullUp_down', 'PullUp_up',  'PushUp_down',  'PushUp_up','SitUp_up', 'SitUp_down']
const UploadActivityPage: React.FC = () =>{
    
    const handleTakeVideo=async()=>{  
       const { VideoRecorder } = Plugins;
        await VideoRecorder.initialize({
            camera: VideoRecorderCamera.FRONT, // Can use BACK
            previewFrames: [config]
        });
        VideoRecorder.startRecording();
        const res = await VideoRecorder.stopRecording();
        // The video url is the local file path location of the video output.
        return res.videoUrl;
    }
    const [model,setModel]=useState<any>()  
    const [message,setMessage]=useState<string>("loading")
    const loadModel =async() => {
        var new_model:LayersModel
        try{
            setMessage("Loading neural Network")
            setLoading(true)
            console.log("loading model")
            new_model = await tf.loadLayersModel('./assets/model/trained_modeltjs/model.json');
            console.log("success")
            setLoading(false)
            setMessage("Loading")
            console.log(new_model)
            setModel(new_model)
            
        }
        catch(e:any){
            console.log(e)
            
            console.log(e.stack)
            console.log("Error")
            setLoading(false)
            setMessage("Loading")
            history.goBack()
            
        }
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
                await SetBadgeMessage("Isufficient reps. expected "+reps_needed +", but detected : "+rep_count)
                console.log("Isufficient reps. expected "+reps_needed +", but detected : "+rep_count)
                await SetAward(false)
            }
           }
       
    }
    const handleSubmit = async (path:any) =>{
      //  await sendClaim();
       // saveImage(values.current.file)
       console.log("model:",model)
        setMessage("Calculating")
        setLoading(true)
        console.log("extracting frames")
        await VideoToFrames.getFrames("https://storage.googleapis.com/gymkingfiles.appspot.com/claims%2F1664197886149.mp4", VideoToFramesMethod.totalFrames).then(async function (frame:ImageData[]) {
            console.log("running through neural network")
            console.log(frame)
            let predictions=await categroize(frame)
            await determineReps(predictions)
        });
        console.log("done")
    
        setLoading(false)
        setAlert(true)  
           
            
        }   
        
        // GET BADGES GET REQUEST 
        useIonViewDidEnter(async()=>{
        
            await loadModel()
          /*  let badgeId= sessionStorage.getItem("badgeid");
            setLoading(true)
            axios.get(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge/${badgeId}`)
                .then(response =>response.data)
                .then(response =>{
                console.log("rsponse",response)
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
            })*/
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
    
        const sendClaim=async()=>{
            console.log(values.current.file)
            let formData = new FormData();
                formData.append("bid", b_id)
                formData.append("email", email!)
                formData.append("password", localStorage.getItem("password")!)
                formData.append("input1", "")
                formData.append("input2", "")
                formData.append("input3", "")
                formData.append('proof', values.current.file, values.current.file.name);
                console.log(formData);
            axios(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim`,{
                "method":"POST",
                data: formData
            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response);
                
            })
            .catch(err => {console.log(err)})
        } 

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
                   
                    <IonButton onClick={ handleSubmit} className="btnSubmit centerComp" color="warning">TAKE VIDEO</IonButton>
                    <input  type="file" accept=".jpg, .png, .avi, .mkv, .asf, .wmv, .mp4, .m4v, .mov, .3gp, .vro, .mpg, .mpeg, .mov" onChange={(ev) => onFileChange(ev)} />
                    <IonButton onClick={sendClaim} className="btnSubmit centerComp" color="warning">Submit</IonButton>  
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