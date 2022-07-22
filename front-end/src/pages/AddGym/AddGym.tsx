import {IonButton,IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonContent,IonGrid,IonHeader,IonIcon,IonInput,IonPage,IonRow,IonText,IonToast, useIonViewWillEnter} from "@ionic/react";
import "./AddGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";
import { useHistory } from "react-router-dom";
import image from '../../icons/gym.png'
const AddGym: React.FC = () => {
//###################################################################################################
//# Initiaitng variables
  const history=useHistory()
 //image
  
  //get request parameters via the url
  //get name and name hook
  const [gymName, setGymName] = useState<string>("name");
  const [gymAddress, setGymAddress] = useState<string>("address");
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -25.7545,
    28.2314,
  ]);
  useIonViewWillEnter(()=>{
      if(sessionStorage.getItem("gymName")!=null)
      {
        setGymName(sessionStorage.getItem("gymName") as string)
      }
      if(sessionStorage.getItem("gymAddress")!=null)
      {
        setGymAddress(sessionStorage.getItem("gymAddress") as string)
      }
      else{
        sessionStorage.setItem("gymAdress",gymAddress)
      }
      if(sessionStorage.getItem("Lat") !=null && sessionStorage.getItem("Long")!=null)
      {
        setCoordinate([Number(sessionStorage.getItem("Lat")),Number(sessionStorage.getItem("Long"))])
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
  const addGym = () => {
    
    fetch(`https://gym-king.herokuapp.com/gyms/gym`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        gymBrandName: gymName,
        gymAddress: gymAddress,
        gymCoordLong: coordinate[1],
        gymCoordLat: coordinate[0],
        gymIcon: gymIcon
      })
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      sessionStorage.setItem("new_gid", response.g_id)
      console.log(sessionStorage.getItem("new_gid"))
      setShowToast1(true)
      history.goBack()
      fetch(`https://gym-king.herokuapp.com/gyms/owned`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: localStorage.getItem('email'),
          gid: sessionStorage.getItem("new_gid")
        })
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem("new_gid")
      })
      .catch((err) => {
        console.log(err);
      }); 
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
            <IonCardTitle>Add Gym</IonCardTitle>
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
                >
                  <Overlay
                    anchor={[coordinate[0], coordinate[1]]}
                    offset={[30, 30]}
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
                onClick={() => addGym()}
              >
                ADD
              </IonButton>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Gym has been added successfully."
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

export default AddGym;
