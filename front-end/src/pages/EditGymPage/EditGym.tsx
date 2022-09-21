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
import axios from "axios";
import DropDown from "../../components/dropdown/dropdown";

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

  const [gymBrand, setGymBrand] = useState<string>(""); 
  const [gymBrands, setGymBrands]= useState(new Array<string>())

//================================================================================================
//    FUNCTIONS
//=================================================================================================
  /**
   * OnIonEnter
   * @brief checks if session storage has values and uses it to fill in gymName,gymAddress and coordinates else calls api for gym details
  */
  useIonViewWillEnter(()=>{

    getBrands()

    if(sessionStorage.getItem("gymName")!=null)
      {
        setGymName(sessionStorage.getItem("gymName") as string)
        setGymBrand(sessionStorage.getItem("gymBrand") as string)
        setGymAddress(sessionStorage.getItem("gymAddress") as string)
        setCoordinate([Number(sessionStorage.getItem("Lat")),Number(sessionStorage.getItem("Long"))])
      }
    else if(sessionStorage.getItem("gymBrand") == null){
      axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/${sessionStorage.getItem("gid")}`,
        {
          "method": "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})
      .then((response) => response.data)
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

  const getBrands = async() =>{
    let gyms: any[]=[]
    let array: string[]=[]
    await axios.get(process.env["REACT_APP_GYM_KING_API"]+`/brands/brand`)
      .then((response) => response.data)
      .then((response) => {
          console.log(response)
           gyms = response
      })
      .catch((err) => {
        console.log(err);
      }); 

      gyms.forEach(async (el:any)=>{
        array.push(el.gym_brandname)
      })
      console.log(array)
      setGymBrands(array)
  }
 /**
   * saveGym function
   * @brief calls api to update a gyms' details
  */
  const saveGym = () => {
    axios(process.env["REACT_APP_GYM_KING_API"]+`/owner/gym/info`,

      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ 
          gid:sessionStorage.getItem("gid"),

          gymName: gymName, 
          gymBrandName: gymBrand,
          address:gymAddress,
          lat:coordinate[0],
          long:coordinate[1],
        })
      }
    )
    .then((response) => response.data)
    .then((response) => {
      setShowToast1(true)
      history.goBack()
    })
    .catch((err) => {
      console.log(err);
      setShowToast2(true)
    });
    

 };
  const chosenValue = (value:any)=>{
    console.log(value);
    sessionStorage.setItem('gymBrand', value);
    setGymBrand(sessionStorage.getItem('gymBrand')!);
  }

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

              <IonText className="smallHeading leftMargin">Gym Brand:</IonText>
                <div style={{"padding":"2%", "width":"83%", "marginLeft":"7%", "height":"9%"}} className=" ">
                    <DropDown list={gymBrands} chosenValue={chosenValue}></DropDown>
              </div>
              <br></br>

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
