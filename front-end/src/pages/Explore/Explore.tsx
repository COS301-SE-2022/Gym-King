import React, { useRef, useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonSearchbar, IonCard, IonCardContent, IonAvatar, IonImg, IonLabel, IonCol, IonGrid, IonRow} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Explore: React.FC = () =>{
    let history=useHistory()

    const searchUser = useRef<HTMLIonSearchbarElement>(null)
    const searchGym = useRef<HTMLIonSearchbarElement>(null)
    
    //search user
    const [foundUser, setFoundUser]= useState(false)
    const [username, setUsername]= useState("")
    const [email, setEmail]= useState("")
    const [fullname, setFullname]= useState("")
    const [profilePicture, setProfilePicture]= useState("")

    //search gym
    const [foundGym, setFoundGym]= useState(false)
    const [gid, setGid] =useState("")
    const [gymName, setGymName] =useState("")
    const [gymBrandName, setGymBrandName] =useState("")
    const [gymAddress, setGymAddress] =useState("")

    const viewUserProfile = () =>{
        //assuming they are not friends
        sessionStorage.setItem("isFriendRequest", "false")
        sessionStorage.setItem("foundUsername", username)
        sessionStorage.setItem("foundEmail", email)
        sessionStorage.setItem("foundFullname", fullname)
        sessionStorage.setItem("foundProfilePicture", profilePicture)
        history.push("/NotFriendProfile")
    }


    const viewGymProfile = () =>{
        //assuming they are not friends
        sessionStorage.setItem("gid", gid)
        sessionStorage.setItem("gym_name", gymName)
        sessionStorage.setItem("gym_brandname", gymBrandName)
        sessionStorage.setItem("gym_address", gymAddress)
        history.push("/GymPage")
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

    const findGym = (gym:any)=>{
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/name/${gym}`)
        .then(response =>response.data)
        .then(response =>{
            
            if(response ===null)
            {
                setFoundGym(false)
                setGid("")
                setGymName("")
                setGymBrandName("")
                setGymAddress("")
            }
            else
            {
                setFoundGym(true)
                setGid(response.g_id)
                setGymName(response.gym_name)
                setGymBrandName(response.gym_brandname)
                setGymAddress(response.gym_address)
            } 
        })
        .catch(err => {
            console.log(err)
            
        })
    }

    //let B1 =["Obs", "BNi", "23n", "wwr", "alP"]
    //let B2 =["Obs", "BNi", "23n", "wwr", "alP"]
    //let N1 = ["Nms", "Uj3", "LaA"]
    //let N2 = ["Nms", "Uj3", "LaA"]

    //similarityBetweenUsers(B1, B2, N1, N2)
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

                    <IonText className='inputHeading'>Find Users</IonText>
                    <IonSearchbar ref={searchUser}
                        onKeyUp ={()=>{
                            let searchVal = searchUser.current?.value;
                            findUser(searchVal)
                        }}
                        
                        onIonClear={()=>{
                            setFoundUser(false)
                            setEmail("")
                            setFullname("")
                            setUsername("")
                            setProfilePicture("")
                        }}
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
                    <IonSearchbar ref={searchGym}
                        onKeyUp ={()=>{
                            let searchVal = searchGym.current?.value;
                            findGym(searchVal)
                        }}
                        
                        onIonClear={()=>{
                            setFoundGym(false)
                            setGid("")
                            setGymName("")
                            setGymBrandName("")
                            setGymAddress("")
                        }}></IonSearchbar>
                    <br></br>
                    {
                        foundGym && 
                        <IonCard button style={{"height":"10%"}} onClick={viewGymProfile}>
                            <IonCardContent style={{"padding":"0%"}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2">
                                            <IonAvatar style={{ "marginBottom":"3%"}}>
                                                <IonImg  style={{"position":"absolute","overflow":"hidden","borderRadius":"50%","backgroundImage":`url(${""})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol style={{"marginTop":"2%"}}>
                                            <IonLabel>{gymName}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                                
                                
                            </IonCardContent>
                        </IonCard>
                    }
                    <br></br>

                    <IonText className='inputHeading'>Suggested Badges</IonText>

                    
                </IonContent>
            </IonPage>
        )
        

}

export default Explore;