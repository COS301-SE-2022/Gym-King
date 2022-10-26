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
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>APP SETTINGS</IonText>
                    <IonText className='inputHeading leftMargin'>Automated marker:</IonText> <br></br><br></br>
                    <SegmentButton  list={['on', 'off']} val={localStorage.getItem('AI_enabled')}chosenValue={setAI_Enabled}></SegmentButton><br></br><br></br>

                    <SegmentButton  list={['on', 'off']} val={localStorage.getItem('Push_enabled')} onChangeCallBack ={setPush_Enabled }></SegmentButton><br></br><br></br>
                    
                </IonContent>
            </IonPage>
        )
        

}

export default AppSettingsPage;

