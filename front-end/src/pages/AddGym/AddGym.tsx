import {  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader,IonIcon,IonInput,IonPage, IonRow, IonText } from '@ionic/react';
import './AddGym.css';
import { ToolBar } from '../../components/toolbar/Toolbar'
import { useState } from 'react';
import { Map, Overlay} from "pigeon-maps";
import { stamenToner } from 'pigeon-maps/providers'
const AddGym: React.FC = () => {

 
  const image:string="https://www.pngfind.com/pngs/m/219-2197153_gym-building-sport-training-svg-png-free-.png"

  const queryString=window.location.search
  const urlParams = new URLSearchParams(queryString);
  var name=urlParams.get('name')
  if(!name)
  { name="name"}
  const [gymName,setGymName]=useState<string>(name);
  var address=urlParams.get('address')
  if(!address)
  { address="address"}
  const [gymAddress,setGymAddress]=useState<string>(address);

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


  const center:[number,number]=[y,x]
  const zoom:number =19
  const href:string="http://localhost:3000/AddGymLocation?name="+gymName+"&address="+gymAddress+"&latitude="+y+"&longitude="+x
  
  let gymIcon="logo";
  const addGym=()=>{
      fetch(`https://gym-king.herokuapp.com/gyms/gym?gbn=${gymName}&ga=${gymAddress}&gclo=${x}&gcla=${y}&gi=${gymIcon}`,{
          "method":"POST"
      })
      .then(response =>response.json())
      .then(response =>{
          console.log(response);
      })
      .catch(err => {console.log(err)})
    }

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
                <IonInput class="AddGymInput" placeholder='name' value={gymName} onIonChange={(e:any)=>{setGymName(e.target.value);}}> </IonInput>
              </IonRow>
              
              <IonRow class="AddGymRow" className='left topMargin'>
                <IonText className='Subheading'>Address:</IonText>
              </IonRow>

              <IonRow className='left'>
                <IonInput class="AddGymInput" placeholder='address' value={gymAddress} onIonChange={(e:any)=>{setGymAddress(e.target.value);}}> </IonInput>
              </IonRow>

              <IonRow  className='left topMargin'>
                <IonText  className='Subheading'>Location:</IonText>
              </IonRow>

              <IonRow className='left'>
                <IonButton expand="block" class="flex-margin" href={href}>
                  <IonIcon class="AddGymLocation" name="location-outline"></IonIcon>
                    <span>Change Co-ordinates</span>
                   <IonIcon class="AddGymArrow" name="chevron-forward-outline"></IonIcon>
                </IonButton>
              </IonRow>
              <IonRow>
                <Map
                  height={200}
                  center={[center[0],center[1]]} 
                  zoom={zoom}
                  provider={stamenToner}
                  > 
                  <Overlay anchor={[y,x]} offset={[30,30]} >
                      <img width={60} height={50} src={image} alt="builing icon">
                      </img> 
                    </Overlay>
                </Map>
            
                </IonRow>
              <IonButton class="AddGymAdd" color="tertiary" onClick={()=>addGym()}>ADD</IonButton>
            </IonGrid>
         
            <IonButton>Next</IonButton>
         </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddGym;
