import {  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader,IonIcon,IonInput,IonPage, IonRow, IonText } from '@ionic/react';
import './AddGym.css';
import { ToolBar } from '../../components/toolbar/Toolbar'

const AddGym: React.FC = () => {

  //POST REQUEST
  //commented out because it generates a warning (because addGym() not used yet)
  /*
  let gymBrandName='';
  let gymAddress='';
  let gymCoordLong='';
  let gymCoordLat='';
  let gymIcon='';



  const addGym=()=>{
      fetch(`https://gym-king.herokuapp.com/gyms/gym?bgn=${gymBrandName}&ga=${gymAddress}&gclo=${gymCoordLong}&gcla=${gymCoordLat}$gi=${gymIcon}`,{
          "method":"POST"
      })
      .then(response =>response.json())
      .then(response =>{
          console.log(response);
      })
      .catch(err => {console.log(err)})
  } */
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
                <IonButton expand="block" class="flex-margin" href="http://localhost:3000/AddGymLocation">
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
