/** 
* @file AppSettingsPage.tsx
* @brief provides the ability to change app settings
*/

import {IonContent, IonText, IonPage, IonHeader,  useIonViewWillEnter} from '@ionic/react';
import SegmentButton from '../../components/segmentButton/segmentButton';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AppSettingsPage.css';
import axios from "axios";

const AppSettingsPage: React.FC = () =>{

    useIonViewWillEnter(()=>{

        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getNotificationStatus`,{
            "method":"POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: { 
                email: localStorage.getItem("email"),
                apikey: sessionStorage.getItem("key")
            }

        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response.status)
            if(response.status === true){
                
                localStorage.setItem("Push_enabled",'on')
            }
            else{
                localStorage.setItem("Push_enabled",'off')
            }
        })
        .catch(err => {console.log(err)}) 
    })

    const setAI_Enabled = (e:string) =>{
            localStorage.setItem("AI_enabled",e)
            console.log("AI",e)
        //setActivityType(e)
    }

    const setPush_Enabled = () =>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/notificationToggle`,{
            "method":"PUT",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: { 
                email: localStorage.getItem("email"),
                apikey: sessionStorage.getItem("key")
            }

        })
        .then(response =>
        {
            
            axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getNotificationStatus`,{
                "method":"POST",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: { 
                    email: localStorage.getItem("email"),
                    apikey: sessionStorage.getItem("key")
                }

            })
            .then(response =>response.data)
            .then(response =>{
                console.log(response.status)
                if(response.status === true){
                    
                    localStorage.setItem("Push_enabled",'on')
                }
                else{
                    localStorage.setItem("Push_enabled",'off')
                }
            })
            .catch(err => {console.log(err)}) 
        })
        .catch(err => {console.log(err)}) 
    }
    //=================================================================================================
    //    Render
    //=================================================================================================
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>APP SETTINGS</IonText>
                    {
                        localStorage.getItem("usertype") ==="gym_user"
                        &&
                        <>
                            <IonText className='inputHeading leftMargin'>Workout Review</IonText> <br></br><br></br>
                            <div className='centerComp' style={{"width":"80%", "fontSize":"80%"}}>
                                <IonText ><i>We have and Artificial Inteligence engine that reviews the proof that you upload for a badge and either accepts or reject this. Turn this off if you would rather have an employee review you.</i></IonText>
                            </div><br></br>
                            <SegmentButton list={['On', 'Off']} val={localStorage.getItem('AI_enabled')} chosenValue={setAI_Enabled}></SegmentButton><br></br><br></br>

                            <IonText className='inputHeading leftMargin'>Push Notificiations</IonText> <br></br><br></br>
                            <SegmentButton  list={['on', 'off']} val={localStorage.getItem('Push_enabled')} onChangeCallBack ={setPush_Enabled }></SegmentButton><br></br><br></br>
                        </>
                    }
                    
                    
                </IonContent>
            </IonPage>
        )
        

}

export default AppSettingsPage;

