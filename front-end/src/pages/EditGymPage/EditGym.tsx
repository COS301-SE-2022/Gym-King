/** 
* @file EditGym.tsx
* @brief provides interface for editing a gym detail
*/
import {IonButton,IonContent,IonHeader,IonIcon,IonInput,IonPage,IonText,IonToast, useIonViewWillEnter} from "@ionic/react";
import "./EditGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { useHistory } from "react-router-dom";
import image from '../../icons/gym.png'

/**
 * const EditGym
 * @returns EditGym Page
 */
const EditGym: React.FC = () => {
//=================================================================================================
//    VARIABLES & HOOKS
//=================================================================================================
  //-history variable,this variables uses the useHistory from react-router to navigate
  const history=useHistory()
  //-gymAddress hook, hook that sets the address of a gym
  const [gymName, setGymName] = useState<string>("name");
  //-gymAddress hook, hook that sets the address of a gym
  const [gymAddress, setGymAddress] = useState<string>("address");
  //-coordinate hook, hook that sets the coordinates of the gym
  const [coordinate, setCoordinate] = useState<[number, number]>([-25.7545,28.2314]);
  //-zoom  variable{number}, stores default zoom value for the map
  const zoom: number = 16;
  //-showToast1  hook, set showToast1 variable on successeful adding of a gym
  const [showToast1, setShowToast1] = useState(false);
  //-showToast2  hook, set showToast2 variable on unsuccesseful adding of a gym
  const [showToast2, setShowToast2] = useState(false);
  //-gymIcon {string}, stores gym icon
  let gymIcon: string = "logo";
//================================================================================================
//    FUNCTIONS
//=================================================================================================
  /**
   * OnIonEnter
   * @brief checks if session storage has values and uses it to fill in gymName,gymAddress and coordinates else calls api for gym details
  */
  useIonViewWillEnter(()=>{
    if(sessionStorage.getItem("gymName")!=null)
      {
        setGymName(sessionStorage.getItem("gymName") as string)
        setGymAddress(sessionStorage.getItem("gymAddress") as string)
        setCoordinate([Number(sessionStorage.getItem("Lat")),Number(sessionStorage.getItem("Long"))])
      }
    else{
      fetch(`https://gym-king.herokuapp.com/gyms/gym/${sessionStorage.getItem("gid")}`,
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
 /**
   * saveGym function
   * @brief calls api to update a gyms' details
  */
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

 const mapTiler =(x: number, y: number, z: number, dpr?: number)=> {
  return `https://api.maptiler.com/maps/voyager/${z}/${x}/${y}.png?key=GhihzGjr8MhyL7bhR5fv`
}
//=================================================================================================
//    RENDER
//=================================================================================================
  return (
    <IonPage>
    <IonHeader>
      <ToolBar></ToolBar>
    </IonHeader>
    <IonContent className='Content' >
          <form>
              <IonText className="PageTitle center">Edit Gym</IonText> <br></br>

              <IonText className="smallHeading leftMargin">Name:</IonText>
              <IonInput required className="textInput  smallerTextBox leftMargin width80" value={gymName} onIonChange={(e: any) => {
                  setGymName(e.target.value);sessionStorage.setItem("gymName",gymName)
                }}>{" "}
              </IonInput> <br></br>

              <IonText className="smallHeading leftMargin">Address:</IonText>
              <IonButton expand="block" class="flex-margin" routerLink="/AddGymLocation" color="secondary">
                <IonIcon className="AddGymLocation" icon="location-outline"></IonIcon>
                <span>{gymAddress}</span>
                <IonIcon class="AddGymArrow" icon="chevron-forward-outline"></IonIcon>
              </IonButton>
              <div className="width80 centerComp">
                <Map
                  height={200}
                  center={[coordinate[0], coordinate[1]]}
                  zoom={zoom}
                  provider={mapTiler}
                  data-testid="map"
                >
                  <Overlay 
                    anchor={[coordinate[0], coordinate[1]]}
                    offset={[30, 30]}
                    data-testid="ov"
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
              class="AddGymAdd"
              color="warning"
              onClick={() => saveGym()}
            >Save changes</IonButton>
        </form>

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
