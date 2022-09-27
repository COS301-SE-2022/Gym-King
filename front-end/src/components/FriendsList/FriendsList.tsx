import { IonItem, IonList, IonAvatar, IonImg, IonLabel} from '@ionic/react';
import React from 'react'
import { useHistory } from 'react-router-dom';


export type props = {friendsList?:any}

const FriendsList: React.FC<props> = (props) =>{

    let history=useHistory()


    const viewFriendProfile= (friend:any) =>{
        sessionStorage.setItem("friendUsername",friend.username)
        sessionStorage.setItem("friendEmail",friend.email)
        sessionStorage.setItem("friendProfile",friend.profile_picture)
        sessionStorage.setItem("friendFullname",friend.fullname)
        history.push("/FriendProfile")
    }

        return(
            
            <IonList mode="ios">
                {
                    props.friendsList.map((el:any)=>{
                        return (<IonItem mode="ios" button detail  onClick={()=>viewFriendProfile(el)} data-testid="aB" key={el.email}>
                                <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                                    <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${el.profile_picture})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                </IonAvatar>
                                <IonLabel mode="ios">{el.username}</IonLabel>
                            </IonItem>)
                    })
                }
            </IonList>  
               
        )
        

}

export default FriendsList;

