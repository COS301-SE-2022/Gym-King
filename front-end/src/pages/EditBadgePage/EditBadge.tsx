import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea, IonIcon} from '@ionic/react';
import { shieldOutline } from 'ionicons/icons';
import DropDown from '../../components/dropdown/dropdown';
import ToolBar from '../../components/toolbar/Toolbar';

//export type CreateBadge = {act?:any}

const EditBadge: React.FC = () =>{
        
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Editing Badge</IonText>

                    <IonIcon icon={shieldOutline} className='badge center shadow'></IonIcon>    

                    <IonText className='inputHeading'>Badge Name:</IonText> <br></br><br></br>
                    <IonInput name='badgeName' type='text' className='textInput centerComp smallerTextBox ' placeholder='badge name'></IonInput><br></br><br></br>

                    <IonText className='inputHeading'>Activity Type:</IonText> <br></br><br></br>
                    <DropDown list={['Strength', 'Cardio']}></DropDown><br></br><br></br>

                    <IonText className='inputHeading'>Gym Location:</IonText> <br></br><br></br>
                    <DropDown list={['List of gyms']}></DropDown><br></br><br></br>

                    <IonText className='inputHeading '>Badge Challenge:</IonText> <br></br><br></br>
                    <IonTextarea className="centerComp textInput smallerTextBox textarea" placeholder="badge challenge..."></IonTextarea><br></br><br></br>

                    <IonText className='inputHeading'>Badge Description:</IonText> <br></br><br></br>
                    <IonTextarea className="centerComp textInput smallerTextBox textarea" placeholder="badge description..."></IonTextarea><br></br><br></br>

                    <IonButton class=" btnFitWidth" color='success' type='submit'>SAVE CHANGES</IonButton>
                    <IonButton class=" btnFitWidth" color='danger' type='submit'>DELETE BADGE</IonButton>
                    <br></br><br></br>

                </IonContent>
            </IonPage>
        )
        
}

export default EditBadge;