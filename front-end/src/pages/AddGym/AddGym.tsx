import {  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader,IonIcon,IonInput,IonPage, IonRow, IonText } from '@ionic/react';
import './AddGym.css';
import { ToolBar } from '../../components/toolbar/Toolbar'

const AddGym: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <ToolBar></ToolBar>
      </IonHeader>
      <IonContent class='AddGymContent'>

        <IonCard class="AddGymCard">

          <IonCardHeader class="AddGymHeader"  className='PageTitle center'>
            <IonCardTitle>Add Gym</IonCardTitle>
          </IonCardHeader>


          <IonCardContent class="AddGymCardContent">
            <IonGrid class="AddGymGrid" className='grid'>

              <IonRow class="AddGymRow" className='left topMargin'>
                <IonText className='Subheading'>Name:</IonText>
              </IonRow>

              <IonRow className='left'>
                <IonInput class="AddGymInput" placeholder='name'> </IonInput>
              </IonRow>

              <IonRow  className='left topMargin'>
                <IonText  className='Subheading'>Location:</IonText>
              </IonRow>

              <IonRow className='left'>
                <IonButton expand="block" class="flex-margin">
                  <IonIcon class="AddGymLocation" name="location-outline"></IonIcon>
                    <span>Address</span>
                   <IonIcon class="AddGymArrow" name="chevron-forward-outline"></IonIcon>
                </IonButton>
              </IonRow>

              <IonButton class="AddGymAdd" color="tertiary">ADD</IonButton>
            </IonGrid>
         
            <IonButton>Next</IonButton>
         </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddGym;
