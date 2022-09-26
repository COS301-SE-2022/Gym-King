import React, { useRef, useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonSearchbar, IonCard, IonCardContent, IonAvatar, IonImg, IonLabel, IonCol, IonGrid, IonRow} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Explore: React.FC = () =>{
    let history=useHistory()

    const searchUser = useRef<HTMLIonSearchbarElement>(null)
    
    //search user
    const [foundUser, setFoundUser]= useState(false)
    const [username, setUsername]= useState("")
    const [email, setEmail]= useState("")
    const [fullname, setFullname]= useState("")
    const [profilePicture, setProfilePicture]= useState("")

    const viewUserProfile = () =>{
        //assuming they are not friends
        history.push("/NonFriendProfile")
    }



    const findUser = (user:any) =>{
        axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/getUser`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                email: localStorage.getItem("email"),
                password:  localStorage.getItem("password"),
                username: user
            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            if(response.message)
            {
                setFoundUser(false)
                setEmail("")
                setFullname("")
                setUsername("")
                setProfilePicture("")
            }
            else
            {
                setFoundUser(true)
                setEmail(response.email)
                setFullname(response.fullname)
                setUsername(response.username)
                setProfilePicture(response.profile_picture)
            }
        })
        .catch(err => {
            console.log(err)
            
        })
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
                    <IonText className='PageTitle center'>Explore</IonText>

                    <IonText className='inputHeading'>Find Friends</IonText>
                    <IonSearchbar ref={searchUser}
                        onKeyUp ={()=>{
                            let searchVal = searchUser.current?.value;
                            let results = findUser(searchVal)
                        }
                        }
                    ></IonSearchbar>
                    <br></br>
                    {
                        foundUser && 
                        <IonCard button style={{"height":"10%"}} onClick={viewUserProfile}>
                            <IonCardContent style={{"padding":"0%"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2">
                                            <IonAvatar style={{ "marginBottom":"3%"}}>
                                                <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${profilePicture})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol style={{"marginTop":"2%"}}>
                                            <IonLabel>{username}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                                
                                
                            </IonCardContent>
                        </IonCard>
                    }
                    <br></br>

                    <IonText className='inputHeading'>Find Gyms</IonText>
                    <IonSearchbar></IonSearchbar>
                    <br></br><br></br>

                    <IonText className='inputHeading'>Suggested Badges</IonText>

                    
                </IonContent>
            </IonPage>
        )
        

}

export default Explore;