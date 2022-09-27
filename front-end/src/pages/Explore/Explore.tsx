import React, { useRef, useState} from 'react'
import {IonContent, IonText, IonPage, IonHeader, IonSearchbar, IonCard, IonCardContent, IonAvatar, IonImg, IonLabel, IonCol, IonGrid, IonRow, useIonViewWillEnter} from '@ionic/react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import BadgeSuggestions from '../../components/BadgeSuggestions/BadgeSuggestions';

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

    //suggested badges
    const [badgeSuggestions, setBadgeSuggestions] =useState([])
    

    useIonViewWillEnter(async()=>{
        await axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/suggestion`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                email: localStorage.getItem("email"),
                password:  localStorage.getItem("password"),

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            setBadgeSuggestions(response)
            
        })
        .catch(err => {
            console.log(err)  
        })
    },[badgeSuggestions])

    const areFriends = async(a:string, b:string)=>{
        let areFriends=false;
        await axios(process.env["REACT_APP_GYM_KING_API"]+`/users/user/checkIfFriends`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ 
                user1email: a,
                password:  localStorage.getItem("password"),
                user2email : b

            })
        })
        .then(response =>response.data)
        .then(response =>{
            console.log(response)
            areFriends=response
        })
        .catch(err => {
            console.log(err)  
        })
        return areFriends
    }

    const viewUserProfile = async() =>{

        let friends =await areFriends(localStorage.getItem("email")!, email)
        console.log(friends)
        
        if(friends)
        {
            sessionStorage.setItem("friendUsername",username)
            sessionStorage.setItem("friendEmail",email)
            sessionStorage.setItem("friendProfile",profilePicture)
            sessionStorage.setItem("friendFullname",fullname)
            history.push("/FriendProfile")
        }
        else
        {
            //is they are not friends 
            
            sessionStorage.setItem("isFriendRequest", "false")
            sessionStorage.setItem("foundUsername", username)
            sessionStorage.setItem("foundEmail", email)
            sessionStorage.setItem("foundFullname", fullname)
            sessionStorage.setItem("foundProfilePicture", profilePicture)
            console.log(sessionStorage.getItem("foundEmail"))
            history.push("/NotFriendProfile") 
        }
        
        
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

    //=================================================================================================
    //    Render
    //=================================================================================================
        return(
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Explore</IonText>

                    <IonGrid >
                        <IonRow>
                            <IonText style={{"paddingLeft":"5%"}} className='inputHeading'>Find Users</IonText>
                            <IonSearchbar ref={searchUser}
                                mode="ios"
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
                        </IonRow>
                        <br></br>
                        <IonRow>
                        {
                            foundUser && 
                            <IonCard mode="ios" button style={{"height":"10%", "width":"100%"}} onClick={viewUserProfile}>
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
                        </IonRow>
                        <br></br>
                        <IonRow>
                        <IonText style={{"paddingLeft":"5%"}} className='inputHeading'>Find Gyms</IonText>
                            <IonSearchbar ref={searchGym}
                                mode="ios"
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
                        </IonRow>
                        <IonRow>
                        <br></br>
                        {
                            foundGym && 
                            <IonCard mode="ios" button style={{"height":"10%", "width":"100%"}} onClick={viewGymProfile}>
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
                        </IonRow>
                        <IonRow>
                        <IonText style={{"paddingLeft":"5%"}} className='inputHeading'>Suggested Badges</IonText>
                        <br></br>
                        </IonRow>
    
                    </IonGrid>
                    <BadgeSuggestions badges={badgeSuggestions}></BadgeSuggestions>


                </IonContent>
            </IonPage>
        )
        

}

export default Explore;