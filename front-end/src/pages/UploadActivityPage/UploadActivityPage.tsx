import {IonContent, IonText, IonPage, IonHeader, IonGrid, IonRow, IonButton, IonToast, IonLoading, useIonViewDidEnter, IonCol} from '@ionic/react'
import React, {  useRef, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './UploadActivityPage.css';
import { useHistory } from 'react-router-dom';
import BadgeImage from '../../components/BadgeImage/BadgeImage';
import axios from "axios";
import * as tf from "@tensorflow/tfjs"
import NNAlert from '../../components/NN_outcome/NN_outcome';
import './index'
import ActivityInputs from '../../components/activityInputs/ActivityInputs';
interface InternalValues {
    file: any;
}

export type UploadActivityStates = {act?:any}

let ai_supported_activites=["pullup","pushup","situp","benchpress"]
let categories=['down',  'up']
const UploadActivityPage: React.FC = () =>{
const inputRefTakeVideo = useRef<HTMLInputElement>(null);
const inputRefUploadVideo = useRef<HTMLInputElement>(null);
 //HOOKS AND VARAIBES
const [award,setAward]=useState<boolean>(false)
 // eslint-disable-next-line
const [isValid, setIsValid] = useState(false);
 // eslint-disable-next-line
const [submitted, setSubmitted] = useState(false);
const [reps_required,setRepsRequired] =useState(0)
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
const [filename,setFilename]=useState<string>("")
const [ai_supported,set_supported]=useState<boolean>(false)
const [repCount,setRepCount]=useState<number>(0)
let email = localStorage.getItem("email") 
localStorage.setItem( 'e1', "");
localStorage.setItem( 'e2', "");
localStorage.setItem( 'e3', "");
let formdata: any
let history=useHistory()


//CUSTOM HOOKS- fro sequential  execution
const SetRepCount=async(num:number)=>
{
    setRepCount(()=>{
        return num
    })
}     
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
const loadModel =async(name:string) => {
    try{

        console.log("passed in parameter",name)
        setMessage("Loading neural Network")
        setLoading(true)
        console.log("loading model")
        console.log("badgename:",name)
        let _activity=name.replaceAll(" ","").replaceAll("-","").toLowerCase();
        console.log("activity:",_activity)
        let ai=false;
        let activity=""
        
        for(let i=0;i<ai_supported_activites.length;i++){
            console.log("match for",ai_supported_activites[i])
            if(_activity.includes(ai_supported_activites[i]))
            {
               set_supported(true)
               activity=ai_supported_activites[i]
               ai=true
            }
        }
        if(ai)
        {
            const new_model= await tf.loadLayersModel("./assets/model/"+activity+"/model.json");
            console.log(new_model)
            setLoading(false)
            setMessage("Loading")
            console.log(new_model)
            setModel(new_model)
        }
        else{
            setError_Mesg("No Ai model available")
            setError_toast(true)
        }
        
    }
    catch(e:any){
        console.log("erro loading model",e)
        setLoading(false)
        setError_Mesg("Device not AI compatible:turning AI settings off")
        setError_toast(true)
        history.goBack()
        
    }
};

    
const categroize=async(images:ImageData[])=>{
    let predictions=[]
    for(let i=0;i<images.length;i++)
    {
        let tensorImg=tf.browser.fromPixels(images[i]).resizeNearestNeighbor([300, 300]).div(tf.scalar(255)).expandDims();
        let prediction= await model.predict(tensorImg).dataSync();
        console.log(i,prediction)
        let index=0;
        let probability=prediction[0]
        if(probability>0.5)
        {
            console.log(probability);
            index=1;
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
        
        for(let i=0 ;i<predictions.length;i++)
        {
        if(current_position!==predictions[i])
        {
            rep_count=rep_count+1;
            current_position=predictions[i]
        }
        }
        rep_count=Math.ceil(rep_count/2)
        console.log("rep_count",rep_count)
        SetRepCount(rep_count)
    //determine if badge should be awarded
        
        if(reps_required<=rep_count)
        {

            console.log("congrats")
            await SetBadgeMessage("You've completed "+reps_required+" reps!!")
            await SetAward(true)
        }
        else{
            await SetBadgeMessage("Isufficient reps.\nexpected "+reps_required+", but detected : "+rep_count)
            console.log("Isufficient reps. expected "+reps_required +", but detected : "+rep_count)
            await SetAward(false)
        }
    
        
    
}

const handleSubmit_AI = async () =>{
    
    console.log(values.current.file)
    //await writeToFile()
    //  await sendClaim();
    // saveImage(values.current.file)
   console.log("model:",model)
    setMessage("Calculating")
    setLoading(true)
    console.log("extracting frames")
    const url = URL.createObjectURL(values.current.file);
    console.log(url)
    await VideoToFrames.getFrames(url, VideoToFramesMethod.totalFrames).then(async function (frame:ImageData[]) {
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
    history.goBack()
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
        //handle post request 
        //const isValid = await claimSchema.isValid(formdata);
        sendClaim();
}

const updateInputs = (e:any) =>{

}


const values =useRef<InternalValues>({
    file: false,
});
const onFileChange = (fileChangeEvent: any) => {
    values.current.file = fileChangeEvent.target.files[0];
    setFilename(values.current.file.name)
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
        formData.append( "apikey", sessionStorage.getItem("key")!)
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
        setLoading(false)
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
const sendAIClaim=()=>{
    setLoading(true)
    let formData = new FormData();
        formData.append("bid", b_id)
        formData.append("email", email!)
        formData.append( "apikey", sessionStorage.getItem("key")!)
        formData.append("input1","AI counted reps:"+ repCount.toString())
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
        setLoading(false)
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
    let bname=""
    let badgeId= sessionStorage.getItem("badgeid");
    setLoading(true)
    await axios.get(process.env["REACT_APP_GYM_KING_API"]+`/badges/badge/${badgeId}`)
        .then(response =>response.data)
        .then(response =>{
        console.log("response",response)
        setB_id(response.b_id)
        setRepsRequired(response.requirement2)
        localStorage.setItem("activitytype", response.activitytype)
        setDescription(response.badgechallenge)
        bname=response.badgename
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
            apikey: sessionStorage.getItem("key")
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
    
    if(localStorage.getItem("AI_enabled")==="on")
        {await loadModel(bname)}
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
                   {AI_enabled==="on" && ai_supported?(
                        <div>
                            <IonButton onClick={()=>{ inputRefTakeVideo.current?.click()  }} className=" centerComp" color="primary">Take Video</IonButton>  
                            <input ref={inputRefTakeVideo} onClick={()=>{console.log("hit")}}  type="file"className='HiddenInputFile'  name="video" accept="video/*" capture="environment" onChange={(ev) => onFileChange(ev)}/>
                            <IonButton onClick={()=>{inputRefUploadVideo.current?.click() }} className=" centerComp" color="primary">Upload Video</IonButton>  
                            <input ref={inputRefUploadVideo}  type="file" className='HiddenInputFile' accept=".mp4" onChange={(ev) => onFileChange(ev)} />
                            <IonText>{filename}</IonText> 
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
                            <IonButton  mode="ios" onClick={()=>{ inputRefTakeVideo.current?.click()  }} className=" centerComp width80" color="primary">Take Video</IonButton>  
                            <input ref={inputRefTakeVideo} onClick={()=>{console.log("hit")}}  type="file"className='HiddenInputFile'  name="video" accept="video/*" capture="environment" onChange={(ev) => onFileChange(ev)}/>

                            <IonButton  mode="ios" onClick={()=>{inputRefUploadVideo.current?.click() }} className=" centerComp width80" color="primary">Upload Video</IonButton>  
                            <input ref={inputRefUploadVideo}  type="file" className='HiddenInputFile' accept=".mp4" onChange={(ev) => onFileChange(ev)} />
                            
                        </IonRow>
                        </IonGrid>
                        <IonText>{filename}</IonText>
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
                        duration={5000}
                        color="danger"
                    />
                    <IonLoading 
                        mode="ios"
                        isOpen={loading}
                        message={message}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
                    <NNAlert award={award} show={Alert} reset={reset} message={badgeMessage} submitClaim={sendAIClaim}></NNAlert>
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
                            !isValid && submitted && <IonText className="errText" style={{"color":"darkorange","paddingLeft":"14%"}}>Please enter the required fields</IonText>
                        }
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left '>
                                <IonText className='Subheading'>Proof</IonText>
                            </IonRow>
                        </IonGrid>
                        <IonGrid className='centerLeft grid'>
                            <IonRow className='left '>
                                <input  type="file" accept=".jpg, .png, .avi, .mkv, .asf, .wmv, .mp4, .m4v, .mov, .3gp, .vro, .mpg, .mpeg, .mov" onChange={(ev) => onFileChange(ev)} required/>
                            </IonRow>
                        </IonGrid>
                        <br></br>
                        <IonButton mode="ios" className="btnSubmit centerComp btn" type='submit' color="warning">SUBMIT</IonButton>
                    </form>
                    <IonButton onClick={ handleSubmit} className="btnSubmit centerComp" color="warning">TEST NN4</IonButton>
                    <br></br>
                    <br></br>
*/
