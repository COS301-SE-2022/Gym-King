/** 
* @file EditGym.tsx
* @brief provides interface for editing a gym detail
*/
import {IonButton,IonContent,IonHeader,IonIcon,IonInput,IonLoading,IonPage,IonText,IonToast, useIonViewWillEnter} from "@ionic/react";
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
  const [gymName, setGymName] = useState<string>(sessionStorage.getItem("gymName")!);
  //-gymAddress hook, hook that sets the address of a gym
  const [gymAddress, setGymAddress] = useState<string>(sessionStorage.getItem("gymAddress")!);
  //-coordinate hook, hook that sets the coordinates of the gym
  const [coordinate, setCoordinate] = useState<[number, number]>([-25.7545,28.2314]);
  //-zoom  variable{number}, stores default zoom value for the map
  const zoom: number = 16;
  //-showToast1  hook, set showToast1 variable on successeful adding of a gym
  const [showToast1, setShowToast1] = useState(false);
  //-showToast2  hook, set showToast2 variable on unsuccesseful adding of a gym
  const [showToast2, setShowToast2] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [gymBrand, setGymBrand] = useState<string>(sessionStorage.getItem("gymBrand")!); 
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
      setLoading(true)
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
        setLoading(false) 
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        setShowToast2(true)
      });
    }
  })

  const getBrands = async() =>{
    setLoading(true)
    let gyms: any[]=[]
    let array: string[]=[]
    await axios.get(process.env["REACT_APP_GYM_KING_API"]+`/brands/brand`)
      .then((response) => response.data)
      .then((response) => {
        setLoading(false)
          console.log(response)
           gyms = response
      })
      .catch((err) => {
        setLoading(false)
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
    setLoading(true)
    axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym/info`,

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
      setLoading(false)
      setShowToast1(true)
      history.goBack()
    })
    .catch((err) => {
      setLoading(false)
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
                    <DropDown list={gymBrands} chosenValue={chosenValue} value={gymBrand}></DropDown>
              </div>
              <br></br>

              <IonText className="smallHeading leftMargin">Address:</IonText>
              <IonButton mode="ios" expand="block" class="flex-margin" routerLink="/AddGymLocation" color="secondary">
                <IonIcon mode="ios" className="AddGymLocation" icon="location-outline"></IonIcon>
                <span>{gymAddress}</span>
                <IonIcon mode="ios" class="AddGymArrow" icon="chevron-forward-outline"></IonIcon>
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
              mode="ios"
              class="AddGymAdd"
              color="warning"
              onClick={() => saveGym()}
            >Save changes</IonButton>
        </form>

        <IonToast
          mode="ios"
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Gym has been saved successfully."
        duration={500}
        color="success"
      />
      <IonToast
        mode="ios"
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Error adding gym."
        duration={500}
        color="danger"
      />
        <IonLoading 
          isOpen={loading}
          message={"Loading"}
          duration={2000}
          spinner={"circles"}
          onDidDismiss={() => setLoading(false)}
          cssClass={"spinner"}
      />
      
      </IonContent>
    </IonPage>
  );
};

export default EditGym;
