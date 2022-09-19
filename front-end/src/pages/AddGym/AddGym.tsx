/** 
* @file AddGym.tsx
* @brief provides interface for adding new gyms to map
*/
import {IonButton,IonContent,IonHeader,IonIcon,IonInput,IonPage,IonText,IonToast, useIonViewWillEnter} from "@ionic/react";
import "./AddGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { useHistory } from "react-router-dom";
import image from '../../icons/gym.png'
import axios from "axios";

/**
 * const addGym
 * @returns AddGym Page
 */
const AddGym: React.FC = () => {
//=================================================================================================
//    VARIABLES & HOOKS
//=================================================================================================
  //-history variable,this variables uses the useHistory from react-router to navigate
  const history=useHistory()
  //-gymName hook, hook that sets the name of a gym
  const [gymName, setGymName] = useState<string>(""); 
  //- gymAddress hook, hook that sets the address of a gym         
  const [gymAddress, setGymAddress] = useState<string>("address");
  //-coordinate hook, hook that sets the coordinates of the gym 
  const [coordinate, setCoordinate] = useState<[number, number]>([-25.7545,28.2314]);
  //-zoom  variable {number}, stores default zoom value for the map
  const zoom: number = 16;
  //-showToast1  hook, set showToast1 variable on successeful adding of a gym
  const [showToast1, setShowToast1] = useState(false);
  //-showToast2  hook ,set showToast2 variable on unsuccesseful adding of a gym
  const [showToast2, setShowToast2] = useState(false);
  //-gymIcon{string}, stores gym icon
//=================================================================================================
//    FUNCTIONS
//=================================================================================================
  /**
   * OnIonEnter
   * @brief checks if session storage has values and uses it to fill in gymName,gymAddress and coordinates else set the default
   */
  useIonViewWillEnter(()=>{
      if(sessionStorage.getItem("gymName")!=null)
      {
        setGymName(sessionStorage.getItem("gymName") as string)
        console.log(gymName)
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
  /**
   * AddGym function
   * @brief calls the add gym api, and adds a gym record the gyms table, then calls the api to assign gym to an owner.
   */
  const addGym = () => {
    
    axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: { 
        gymBrandName: gymName,
        gymAddress: gymAddress,
        gymCoordLong: coordinate[1],
        gymCoordLat: coordinate[0]
        }
    }
  )
    .then((response) => response.data)
    .then((response) => {
      console.log(response);
      sessionStorage.setItem("new_gid", response.g_id)
      console.log(sessionStorage.getItem("new_gid"))
      setShowToast1(true)
      history.goBack()
      axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/owned`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data:{ 
          email: localStorage.getItem('email'),
          gid: sessionStorage.getItem("new_gid")
        }
      }
    )
      .then((response) => response.data)
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

  const mapTiler =(x: number, y: number, z: number, dpr?: number)=> {
    return `https://api.maptiler.com/maps/voyager/${z}/${x}/${y}.png?key=GhihzGjr8MhyL7bhR5fv`
  }
//=================================================================================================
//    Render
//=================================================================================================
  return (
    <IonPage>
      <IonHeader>
        <ToolBar></ToolBar>
      </IonHeader>
      <IonContent className='Content' >
            <form>
                <IonText className="PageTitle center">Add Gym</IonText> <br></br>

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
                onClick={() => addGym()}
              >ADD</IonButton>
          </form>


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
