import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonToast, IonLoading, useIonViewDidEnter, IonCol} from '@ionic/react'
import React, {  useRef, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './UploadActivityPage.css';
import { useHistory } from 'react-router-dom';
import BadgeImage from '../../components/BadgeImage/BadgeImage';
import axios from "axios";
import * as tf from "@tensorflow/tfjs"
import NNAlert from '../../components/NN_outcome/NN_outcome';
import {claimSchema} from '../../validation/UploadClaimValidation'
import './index'
import { LayersModel } from '@tensorflow/tfjs';
import ActivityInputs from '../../components/activityInputs/ActivityInputs';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
interface InternalValues {
    file: any;
}

export type UploadActivityStates = {act?:any}

let categories=['BenchPress_down','BenchPress_up', 'PullUp_down', 'PullUp_up',  'PushUp_down',  'PushUp_up','SitUp_up', 'SitUp_down']
const UploadActivityPage: React.FC = () =>{
const inputRefTakeVideo = useRef<HTMLInputElement>(null);
const inputRefUploadVideo = useRef<HTMLInputElement>(null);
 //HOOKS AND VARAIBES
const [award,setAward]=useState<boolean>(false)
const [isValid, setIsValid] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [Icon,setIcon]=useState<string[]>([""])
const [model,setModel]=useState<any>()  
const [message,setMessage]=useState<string>("loading")
const [showToast1, setShowToast1] = useState(false);
const [b_id, setB_id] = useState('');
const [badgename, setBadgename] = useState('');
const [badgedescription, setDescription] = useState('');
const [loading, setLoading] = useState<boolean>(false);
const [username, setUsername]=useState("");
const [badgeMessage,setBadgeMessage]=useState<string>("unsuccessful")
const [Alert,setAlert]=useState<boolean>(false)
const [AI_enabled,setAI_enabled]=useState<string>("off")
const [error_toast,setError_toast]=useState<boolean>(false)
const [error_Mesg,setError_Mesg]=useState<string>("error")
let email = localStorage.getItem("email") 
localStorage.setItem( 'e1', "");
localStorage.setItem( 'e2', "");
localStorage.setItem( 'e3', "");
let formdata: any
let history=useHistory()


//CUSTOM HOOKS- fro sequential  execution
const SetAward=async(value:boolean)=>
{
    setAward(()=>
    {
        return value
    })
}
const SetBadgeMessage=async(msg:string)=>
{
    setBadgeMessage(()=>{
        return msg;
    })
}
    
const SetAI_enabled=async(msg:string)=>
{
    setAI_enabled(()=>
    {
        return msg;
    })
}
//METHODS     
const loadModel =async() => {
    if(model===undefined)
    {
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
        console.log(e.message)
        console.log("Error")
        setLoading(false)
        setError_Mesg("Device not AI compatible:turning AI settings off")
        localStorage.setItem("AI_enabled","off")
        setError_toast(true)
        history.goBack()
        
    }
}
};

    
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
const toBase64 =(file:File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const writeToFile=async()=>{
    console.log('media/'+values.current.file.name)
    var media:string=(await toBase64(values.current.file) as string)
    await Filesystem.writeFile({
        path: 'media/'+values.current.file.name,
        data: media,
        directory: Directory.Data
      });
}
const handleSubmit_AI = async (path:any) =>{
    
    console.log(values.current.file)
    await writeToFile()
    //  await sendClaim();
    // saveImage(values.current.file)
   console.log("model:",model)
    setMessage("Calculating")
    setLoading(true)
    console.log("extracting frames")
    await VideoToFrames.getFrames('./media/'+values.current.file.name, VideoToFramesMethod.totalFrames).then(async function (frame:ImageData[]) {
        console.log("running through neural network")
        console.log(frame)
        let predictions=await categroize(frame)
        await determineReps(predictions)
    });
    console.log("done")

    setLoading(false)
    setAlert(true)  
        
        
}   
const reset= () => {
    setAlert(false)
}
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
    setLoading(true)
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
        setLoading(fail)
        //console.log(response);
        setShowToast1(true);
        sessionStorage.removeItem("badgeid")
        history.goBack();
    })
    .catch(err => {
        setLoading(false)
        console.log(err)
    }) 
}
//ON ION ENTER      
useIonViewDidEnter(async()=>{
    await SetAI_enabled(localStorage.getItem("AI_enabled") as string)

    if(localStorage.getItem("AI_enabled")==="on")
        {await loadModel()}
    let badgeId= sessionStorage.getItem("badgeid");
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
    })
})

   

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
                   {AI_enabled==="on"?(
                        <div>
                            <IonButton onClick={()=>{ inputRefTakeVideo.current?.click()  }} className="btnSubmit centerComp" color="warning">Take Video</IonButton>  
                            <input ref={inputRefTakeVideo} onClick={()=>{console.log("hit")}}  type="file"className='HiddenInputFile'  name="video" accept="video/*" capture="environment" onChange={(ev) => onFileChange(ev)}/>
                            <IonButton onClick={()=>{inputRefUploadVideo.current?.click() }} className="btnSubmit centerComp" color="warning">Upload Video</IonButton>  
                            <input ref={inputRefUploadVideo}  type="file" className='HiddenInputFile' accept=".mp4" onChange={(ev) => onFileChange(ev)} />
                            <IonButton onClick={handleSubmit_AI } className="btnSubmit centerComp" color="warning">Submit</IonButton>  
                        </div>
                   ):(
                    <div>
                       
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
                        <IonGrid className='centerLeft grid'>
                        <IonRow className='left topMargin'>
                            <IonButton onClick={()=>{ inputRefTakeVideo.current?.click()  }} className="btnSubmit centerComp" color="warning">Take Video</IonButton>  
                            <input ref={inputRefTakeVideo} onClick={()=>{console.log("hit")}}  type="file"className='HiddenInputFile'  name="video" accept="video/*" capture="environment" onChange={(ev) => onFileChange(ev)}/>

                            <IonButton onClick={()=>{inputRefUploadVideo.current?.click() }} className="btnSubmit centerComp" color="warning">Upload Video</IonButton>  
                            <input ref={inputRefUploadVideo}  type="file" className='HiddenInputFile' accept=".mp4" onChange={(ev) => onFileChange(ev)} />
                        </IonRow>
                        </IonGrid>
                        <br></br>
                        <IonButton mode="ios" className="btnSubmit centerComp btn" type='submit' color="warning">SUBMIT</IonButton>
                    </form> 
                    </div>
                   )

                   }
                    
                    <IonToast
                        isOpen={showToast1}
                        onDidDismiss={() => setShowToast1(false)}
                        message="Your claim has been uploaded."
                        duration={500}
                        color="success"
                    />
                    <IonToast
                        isOpen={error_toast}
                        onDidDismiss={() => setError_toast(false)}
                        message={error_Mesg}
                        duration={1000}
                        color="danger"
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
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left topMargin'>
                                <input  type="file" accept=".jpg, .png, .avi, .mkv, .asf, .wmv, .mp4, .m4v, .mov, .3gp, .vro, .mpg, .mpeg, .mov" onChange={(ev) => onFileChange(ev)} />
                            </IonRow>
                        </IonGrid>
                        <br></br>
                        <IonButton mode="ios" className="btnSubmit centerComp btn" type='submit' color="warning">SUBMIT</IonButton>
                    </form>
                    <IonButton onClick={ handleSubmit} className="btnSubmit centerComp" color="warning">TEST NN4</IonButton>
                    <br></br>
                    <br></br>
*/
