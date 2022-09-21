import { IonItem, IonList, IonAvatar, IonImg, IonLabel} from '@ionic/react';
import React from 'react'
import { useHistory } from 'react-router-dom';


export type props = {friendsList?:any}

const FriendsList: React.FC<props> = (props) =>{

    let history=useHistory()


    const viewFriendProfile= () =>{
        history.push("/FriendProfile")
    }

        return(
            
            <IonList>
                {
                    props.friendsList.map((el:any)=>{
                        return (<IonItem button detail  onClick={viewFriendProfile} data-testid="aB" key={el.email + Math.random()}>
                                <IonAvatar style={{"marginRight":"1em", "marginBottom":"3%"}}>
                                    <IonImg  style={{"position":"absolute","overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${el.profile})`}} alt="" className="toolbarImage  contain "  ></IonImg>                        
                                </IonAvatar>
                                <IonLabel>{el.username}</IonLabel>
                            </IonItem>)
                    })
                }
            </IonList>  
               
        )
        

}

export default FriendsList;

