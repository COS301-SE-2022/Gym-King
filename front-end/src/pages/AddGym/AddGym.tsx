import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonText,
  IonToast,
} from "@ionic/react";
import "./AddGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";
import Geocoder from "react-native-geocoding";
const AddGym: React.FC = () => {
//###################################################################################################
//# Initiaitng variables
 //image
  const image: string =
    "https://www.pngfind.com/pngs/m/219-2197153_gym-building-sport-training-svg-png-free-.png";
  
  //get request parameters via the url
  //get name and name hook
  const queryString: string = window.location.search;
  const urlParams: any = new URLSearchParams(queryString);
  var name: string = urlParams.get("name");
  if (!name) {
    name = "name";
  }
  const [gymName, setGymName] = useState<string>(name);

  //get addressand address hook
  var address: string = urlParams.get("address");
  if (!address) {
    address = "address";
  }
  const [gymAddress, setGymAddress] = useState<string>(address);

  //get coordinates and coordinates hook
  var y = urlParams.get("latitude");
  var x = urlParams.get("longitude");
  if (!y && !x) {
    y = "-25.7545";
    x = "28.2314";
  }

  const [coordinate, setCoordinate] = useState<[number, number]>([
    parseFloat(y),
    parseFloat(x),
  ]);

  //zoom parameter fpr map
  const zoom: number = 16;

  //url with get parameter
  const href: string =
    "http://localhost:3000/AddGymLocation?name=" +
    gymName +
    "&address=" +
    gymAddress +
    "&latitude=" +
    coordinate[0] +
    "&longitude=" +
    coordinate[1]
  //Toast
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
//###################################################################################################
//# API CALLS AND FUNCTION CALLS
//ADD GYM API
  let gymIcon: string = "logo";
  const addGym = () => {
    setShowToast1(true)
    fetch(
    `https://gym-king.herokuapp.com/gyms/gym?gbn=${gymName}&ga=${gymAddress}&gclo=${x}&gcla=${y}&gi=${gymIcon}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      setShowToast1(true)
    });
  };
//GEO CODER API
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      console.log("using geocoding api");
      Geocoder.init("AIzaSyD9pQDwcGJFK6NRGNj5-YwdJBx2PtERCTg");
      Geocoder.from(gymAddress)
        .then((json) => {
          var addressComponent = json.results[0].geometry.location;
          console.log(json.results);
          setCoordinate([addressComponent.lat, addressComponent.lng]);
        })
        .catch((error) => console.warn(error));
    }
  };

//###################################################################################################
//# Page to render
  return (
    <IonPage>
      <IonHeader>
        <ToolBar></ToolBar>
      </IonHeader>
      <IonContent class="AddGymContent">
        <IonCard class="AddGymCard">
          <IonCardHeader class="AddGymHeader" className="PageTitle center">
            <IonCardTitle>Add Gym</IonCardTitle>
          </IonCardHeader>

          <IonCardContent class="AddGymCardContent">
            <IonGrid class="AddGymGrid" className="grid">
              <IonRow class="AddGymRow" className="left topMargin">
                <IonText className="Subheading">Name:</IonText>
              </IonRow>

              <IonRow className="left">
                <IonInput
                  class="AddGymInput"
                  placeholder="name"
                  value={gymName}
                  onIonChange={(e: any) => {
                    setGymName(e.target.value);
                  }}
                >
                  {" "}
                </IonInput>
              </IonRow>

              <IonRow class="AddGymRow" className="left topMargin">
                <IonText className="Subheading">Address:</IonText>
              </IonRow>

              <IonRow className="left">
                <IonInput
                  class="AddGymInput"
                  placeholder="address"
                  value={gymAddress}
                  onKeyDown={handleKeyDown}
                  onIonChange={(e: any) => {
                    setGymAddress(e.target.value);
                  }}
                >
                  {" "}
                </IonInput>
              </IonRow>

              <IonRow className="left topMargin">
                <IonText className="Subheading">Location:</IonText>
              </IonRow>

              <IonRow className="left">
                <IonButton expand="block" class="flex-margin" href={href}>
                  <IonIcon
                    class="AddGymLocation"
                    name="location-outline"
                  ></IonIcon>
                  <span>adjust Co-ordinates</span>
                  <IonIcon
                    class="AddGymArrow"
                    name="chevron-forward-outline"
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
                color="tertiary"
                onClick={() => addGym()}
              >
                ADD
              </IonButton>
            </IonGrid>

            <IonButton>Next</IonButton>
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
