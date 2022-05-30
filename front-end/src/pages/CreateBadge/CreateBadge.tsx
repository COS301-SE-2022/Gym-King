import {IonContent, IonText, IonPage, IonHeader, IonButton, IonInput, IonTextarea} from '@ionic/react';
import DropDown from '../../components/Dropdown/dropdown';
import FileChooser from '../../components/FileChooser/FileChooser';
import { ToolBar } from '../../components/toolbar/Toolbar';

//export type CreateBadge = {act?:any}

const CreateBadge: React.FC = () =>{
        
        return(
        
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Creating Badge</IonText>

                    <IonText className='inputHeading'>Badge Name:</IonText> <br></br><br></br>
                    <IonInput name='badgeName' type='text' className='textInput centerComp smallerTextBox' ></IonInput><br></br><br></br>

                    <IonText className='inputHeading'>Activity Type:</IonText> <br></br><br></br>
                    <DropDown list={['Strength', 'Cardio']}></DropDown><br></br><br></br>

                    <IonText className='inputHeading'>Gym Location:</IonText> <br></br><br></br>
                    <DropDown list={['List of gyms']}></DropDown><br></br><br></br>

                    <IonText className='inputHeading '>Badge Challenge:</IonText> <br></br><br></br>
                    <IonTextarea className="centerComp textInput smallerTextBox" placeholder="Enter here..."></IonTextarea><br></br><br></br>

                    <IonText className='inputHeading'>Badge Description:</IonText> <br></br><br></br>
                    <IonTextarea className="centerComp textInput smallerTextBox" placeholder="Enter here..."></IonTextarea><br></br><br></br>


                    <IonText className='inputHeading'>Upload Badge Icon:</IonText> <br></br><br></br>
                    <FileChooser numFiles={0}></FileChooser>

                    <IonButton class="btnSubmit" type='submit'>CREATE</IonButton>

                    <br></br><br></br>

                </IonContent>
            </IonPage>
        )
        
}

export default CreateBadge;