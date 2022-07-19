import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonToast,
} from "@ionic/react";
import "./EditGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";
import Geocoder from "react-native-geocoding";
const EditGym: React.FC = () => {
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
    `https://gym-king.herokuapp.com/gyms/gym`,
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
          <IonText class="PageTitle center">Edit Gym</IonText>

                <IonText className='inputHeading leftMargin'>Name:</IonText> <br></br>
                <IonInput class="textInput centerComp smallerTextBox"
                  value={gymName}
                  onIonChange={(e: any) => {
                    setGymName(e.target.value);
                  }}
                >
                  {" "}
                </IonInput> <br></br>

                <IonText className='inputHeading leftMargin'>Address:</IonText> <br></br><br></br>
                <IonInput
                  class="textInput centerComp smallerTextBox"
                  placeholder="address"
                  value={gymAddress}
                  onKeyDown={handleKeyDown}
                  onIonChange={(e: any) => {
                    setGymAddress(e.target.value);
                  }}
                >
                  {" "}
                </IonInput><br></br> 

                <IonText className='inputHeading leftMargin'>Location:</IonText> <br></br><br></br>

                <IonButton expand="block" className="flex-margin centerComp width80" href={href} color="secondary">
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
                <div className="centerMap centerComp">
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
                </div>
              <IonButton
                className="width80 centerComp"
                color="tertiary"
                onClick={() => addGym()}
              >
                Save Changes
              </IonButton>
              <br></br><br></br>
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

export default EditGym;
