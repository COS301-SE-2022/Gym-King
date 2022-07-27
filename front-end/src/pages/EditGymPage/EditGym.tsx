import {IonButton,IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonContent,IonGrid,IonHeader,IonIcon,IonInput,IonPage,IonRow,IonText,IonToast, useIonViewDidEnter} from "@ionic/react";
import "./EditGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";
import { useHistory } from "react-router-dom";
const EditGym: React.FC = () => {
//###################################################################################################
//# Initiaitng variables
  const history=useHistory()
 //image
  const image: string =
    "https://www.pngfind.com/pngs/m/219-2197153_gym-building-sport-training-svg-png-free-.png";
  
  //get request parameters via the url
  //get name and name hook
  const [gymName, setGymName] = useState<string>("name");
  const [gymAddress, setGymAddress] = useState<string>("address");
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -25.7545,
    28.2314,
  ]);
  useIonViewDidEnter(()=>{
    console.log(sessionStorage.getItem("gid"))
      if(sessionStorage.getItem("gymName")!=null)
      {
        setGymName(sessionStorage.getItem("gymName") as string)
        setGymAddress(sessionStorage.getItem("gymAddress") as string)
        setCoordinate([Number(sessionStorage.getItem("Lat")),Number(sessionStorage.getItem("Long"))])
      }
      else{
        fetch(`https://gym-king.herokuapp.com/gyms/gym/${sessionStorage.getItem('gid')}`,
        {
          method: "Get",
          headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
    .then((response) => response.json())
    .then((response) => {
      sessionStorage.setItem("gymName",response.gym_brandname)
      sessionStorage.setItem("gymAddress",response.gym_address)
      sessionStorage.setItem("Lat",String(response.gym_coord_lat))
      sessionStorage.setItem("Long",String(response.gym_coord_long))
      setGymName(sessionStorage.getItem("gymName") as string)
      setGymAddress(sessionStorage.getItem("gymAddress") as string)
      setCoordinate([Number(sessionStorage.getItem("Lat")),Number(sessionStorage.getItem("Long"))])
      
      
    })
    .catch((err) => {
      console.log(err);
      setShowToast2(true)
    });
    

    }
  })
  
  //zoom parameter fpr map
  const zoom: number = 16;
  //Toast
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
//###################################################################################################
//# API CALLS AND FUNCTION CALLS
//ADD GYM API
  let gymIcon: string = "logo";
  const saveGym = () => {
    
  fetch(`https://gym-king.herokuapp.com/owner/gym/info`,
    {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        gid:sessionStorage.getItem("gid"),
        brandname: gymName, 
        address:gymAddress,
        lat:coordinate[0],
        long:coordinate[1],
        icon:gymIcon
      })
    }
  )
    .then((response) => response.json())
    .then((response) => {
      setShowToast1(true)
      history.goBack()
    })
    .catch((err) => {
      console.log(err);
      setShowToast2(true)
    });
    

  };
//GEO CODER API
  

//###################################################################################################
//# Page to render
  return (
    <IonPage>
      <IonHeader>
        <ToolBar></ToolBar>
      </IonHeader>
      <IonContent class="">
        <IonCard className="glassForm">
          <IonCardHeader  className="PageTitle center" color="secondary" >
            <IonCardTitle>Edit Gym</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid class="AddGymGrid" className="grid">
              <IonRow class="AddGymRow" className="left topMargin">
                <IonText className="Subheading">Name:</IonText>
              </IonRow>

              <IonRow className="left">
                <IonInput
                  class="textInput"
    
                  value={gymName}
                  onIonChange={(e: any) => {
                    setGymName(e.target.value);sessionStorage.setItem("gymName",gymName)
                  }}
                >
                  {" "}
                </IonInput>
              </IonRow>

              <IonRow class="AddGymRow" className="left topMargin">
                <IonText className="Subheading">Address:</IonText>
              </IonRow>

              <IonRow className="left">
                <IonButton expand="block" class="flex-margin" routerLink="/AddGymLocation" color="secondary">
                  <IonIcon
                    class="AddGymLocation"
                    icon="location-outline"
                  ></IonIcon>
                  <span>{gymAddress}</span>
                  <IonIcon
                    class="AddGymArrow"
                    icon="chevron-forward-outline"
                  ></IonIcon>
                </IonButton>
              </IonRow>
              <IonRow>
                <Map
                  height={200}
                  center={[coordinate[0], coordinate[1]]}
                  zoom={zoom}
                  provider={stamenToner}
                  data-testid="map"
                >
                  <Overlay
                    anchor={[coordinate[0], coordinate[1]]}
                    offset={[30, 30]}
                    data-testid="oLay"
                  >
                    <img
                      width={60}
                      height={50}
                      src={image}
                      alt="builing icon"
                    ></img>
                  </Overlay>
                </Map>
              </IonRow>
              <IonButton
                class="AddGymAdd"
                color="warning"
                onClick={() => saveGym()}
              >
                Save changes
              </IonButton>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Gym has been saved successfully."
        duration={500}
        color="success"
      />
      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Error adding gym."
        duration={500}
        color="danger"
      />
      
      </IonContent>
    </IonPage>
  );
};

export default EditGym;
