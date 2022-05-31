import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonIcon, IonRouterLink} from '@ionic/react';
import { shieldOutline } from 'ionicons/icons';
import { useState } from 'react';
import DropDown from '../../components/dropdown/dropdown';
import ToolBar from '../../components/toolbar/Toolbar';

//export type CreateBadge = {act?:any}

const EditBadge: React.FC = () =>{
        
///////////////////////GET REQUEST/////////////////////////
    let badgeId= 'wTs';
    //const [b_id, setB_id] = useState('');
    const [badgename, setBadgename] = useState('');
    //const [activitytype, setAT] = useState('');
    const [badgedescription, setDescription] = useState('');
    const [badgechallenge, setChallenge] = useState('');

    //const [g_id, setG_id] = useState(''); //commented because not used

    const getBadges= ()=>{
        fetch(`https://gym-king.herokuapp.com/badges/badge?bid=${badgeId}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            console.log(response)
            //setB_id(response.results[0].b_id)
            //setAT( response.results[0].activitytype)
            setDescription(response.results[0].badgedescription)
            setBadgename(response.results[0].badgename)
            setChallenge(response.results[0].badgechallenge)
            //setG_id(response.results[0].g_id)
        })
        .catch(err => {console.log(err)})
    } 
    getBadges();

///////////////////////////////////////////////////////////
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Editing Badge</IonText>

                    <IonIcon icon={shieldOutline} className='badge center shadow'></IonIcon>    
                    <IonRouterLink className='center link'  >Change badge icon</IonRouterLink><br></br><br></br>

                    <IonText className='inputHeading'>Badge Name:</IonText> <br></br><br></br>
                    <IonInput name='badgeName' type='text' className='textInput centerComp smallerTextBox ' value={badgename}></IonInput><br></br><br></br>

                    <IonText className='inputHeading'>Activity Type:</IonText> <br></br><br></br>
                    <DropDown list={['Strength', 'Cardio']}></DropDown><br></br><br></br>

                    <IonText className='inputHeading'>Gym Location:</IonText> <br></br><br></br>
                    <DropDown list={['List of gyms']}></DropDown><br></br><br></br>

                    <IonText className='inputHeading '>Badge Challenge:</IonText> <br></br><br></br>
                    <IonTextarea className="centerComp textInput smallerTextBox textarea" value={badgechallenge}></IonTextarea><br></br><br></br>

                    <IonText className='inputHeading'>Badge Description:</IonText> <br></br><br></br>
                    <IonTextarea className="centerComp textInput smallerTextBox textarea" value={badgedescription}></IonTextarea><br></br><br></br>

                    <IonButton class=" btnFitWidth" color='success' type='submit'>SAVE CHANGES</IonButton>
                    <IonButton class=" btnFitWidth" color='danger' type='submit'>DELETE BADGE</IonButton>
                    <br></br><br></br>

                </IonContent>
            </IonPage>
        )
        
}

export default EditBadge;