import {  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader,IonIcon,IonInput,IonPage, IonRow, IonText } from '@ionic/react';
import './AddGym.css';
import { ToolBar } from '../../components/toolbar/Toolbar'
import { useState } from 'react';
import { Map} from "pigeon-maps";

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

  

  const queryString=window.location.search
  const urlParams = new URLSearchParams(queryString);

  var name=urlParams.get('name')
  if(!name)
  { name="name"}

  var y:number
  var x:number
  var latitude=urlParams.get('latitude')
  if(!latitude)
  { y=-25.7545 }
  else
  { y=parseFloat(latitude) }

  var longitude=urlParams.get('longitude')
  if(!longitude)
  { x= 28.2314 }
  else
  { x=parseFloat(longitude)}

  const [gymName,setGymName]=useState<string>(name);
  const center:[number,number]=[y,x]
  const zoom:number =19
  const href:string="http://localhost:3000/AddGymLocation?name="+name+"&latitude="+y+"&longitude="+x;



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
                <IonInput class="AddGymInput" placeholder='name' value={gymName} onIonChange={(e:any)=>setGymName(e.target.value)}> </IonInput>
              </IonRow>

              <IonRow  className='left topMargin'>
                <IonText  className='Subheading'>Location:</IonText>
              </IonRow>

              <IonRow className='left'>
                <IonButton expand="block" class="flex-margin" href={href}>
                  <IonIcon class="AddGymLocation" name="location-outline"></IonIcon>
                    <span>Address</span>
                   <IonIcon class="AddGymArrow" name="chevron-forward-outline"></IonIcon>
                </IonButton>
              </IonRow>
              <IonRow>
                <Map
                  touchEvents={false}
                  height={300}
                  center={[center[0],center[1]]} 
                  zoom={zoom}
                  maxZoom={zoom}
                  minZoom={zoom}
                  > 
                </Map>
                <IonGrid class="SelectGymGrid" className='grid'>
                    <IonRow>
                      <IonIcon class="SelectGymMapIcon" name="barbell-outline"></IonIcon>
                    </IonRow>
                    <IonRow  >
                      <IonIcon class="SelectGymMapIcon"  name="home-sharp"></IonIcon>
                    </IonRow>
                  </IonGrid>
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
