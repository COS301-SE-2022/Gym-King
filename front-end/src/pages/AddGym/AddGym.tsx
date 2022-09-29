/** 
* @file AddGym.tsx
* @brief provides interface for adding new gyms to map
*/
import {IonButton,IonContent,IonHeader,IonIcon,IonInput,IonLabel,IonLoading,IonPage,IonText,IonToast, useIonViewDidEnter} from "@ionic/react";
import "./AddGym.css";
import { ToolBar } from "../../components/toolbar/Toolbar";
import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { useHistory } from "react-router-dom";
import image from '../../icons/gym.png'
import axios from "axios";
import DropDown from "../../components/dropdown/dropdown";
import { onlyLettersAndSpaces } from "../../utils/validation";

/**
 * const addGym
 * @returns AddGym Page
 */
const AddGym: React.FC = () => {
//=================================================================================================
//    VARIABLES & HOOKS
//=================================================================================================

  const [gymBrands, setGymBrands]= useState(new Array<string>())

  //-history variable,this variables uses the useHistory from react-router to navigate
  const history=useHistory()
  //-gymName hook, hook that sets the name of a gym
  const [gymName, setGymName] = useState<string>(""); 
  //-gymBrand hook, hook that sets the brand of a gym
  const [gymBrand, setGymBrand] = useState<string>(""); 
  //- gymAddress hook, hook that sets the address of a gym         
  const [gymAddress, setGymAddress] = useState<string>("");
  //-coordinate hook, hook that sets the coordinates of the gym 
  const [coordinate, setCoordinate] = useState<[number, number]>([-25.7545,28.2314]);
  //-zoom  variable {number}, stores default zoom value for the map
  const zoom: number = 16;
  //-showToast1  hook, set showToast1 variable on successeful adding of a gym
  const [showToast1, setShowToast1] = useState(false);
  //-showToast2  hook ,set showToast2 variable on unsuccesseful adding of a gym
  const [showToast2, setShowToast2] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);


    const [errors, setErrors] = useState({
      name: '',
      brand: '',
      address:''
  });

  const handleError = (error:string, input:string) => {
      setErrors(prevState => ({...prevState, [input]: error}));
  };

  const  validate = () => {
      let isValid = true

      if(gymName==="" || onlyLettersAndSpaces(gymName)) {
          handleError('Please input a valid name', 'name');
          isValid = false;
      }
      else
          handleError('', 'name');

      if(gymBrand ==="") {
          handleError('Please select a gym brand', 'brand');
          isValid = false;
      }
      else
          handleError('', 'brand');

      if(gymAddress ==="") {
          handleError('Please select an address', 'address');
          isValid = false;
      }
      else
          handleError('', 'address');
  


      return isValid;
  }
 
//=================================================================================================
//    FUNCTIONS
//=================================================================================================
  /**
   * OnIonEnter
   * @brief checks if session storage has values and uses it to fill in gymName,gymAddress and coordinates else set the default
   */
  useIonViewDidEnter(()=>{

      getBrands()

      if(sessionStorage.getItem("gymName")!=null)
      {
        setGymName(sessionStorage.getItem("gymName") as string)
      }
      if(sessionStorage.getItem("gymBrand")!=null)
      {
        setGymName(sessionStorage.getItem("gymBrand") as string)
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

  const handleSubmit = () =>{
      let isValid = validate()
      if(isValid)
        addGym()
  }
  /**
   * AddGym function
   * @brief calls the add gym api, and adds a gym record the gyms table, then calls the api to assign gym to an owner.
   */
  const addGym = () => {
    

    setLoading(true)
    axios(process.env["REACT_APP_GYM_KING_API"]+`/gyms/gym`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: { 
        email: localStorage.getItem("email"),
        apikey: sessionStorage.getItem("key"),
        gymName: gymName,
        gymBrandName: gymBrand,
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
          apikey:sessionStorage.getItem("key"),
          gid: sessionStorage.getItem("new_gid")
        }
      }
    )
      .then((response) => response.data)
      .then((response) => {
        setLoading(false)
        console.log(response);
        sessionStorage.removeItem("new_gid")
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      }); 
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
                </IonInput>
                {errors.name!=="" && (
                    <>
                    <IonLabel className="errText leftMargin" style={{"color":"darkorange"}}>{errors.name}</IonLabel><br></br>
                    </>
                )}
                <br></br>

                <IonText className="smallHeading leftMargin">Gym Brand:</IonText>
                <div style={{"padding":"2%", "width":"83%", "marginLeft":"7%", "height":"9%"}} className=" ">
                  <DropDown list={gymBrands} chosenValue={chosenValue}></DropDown>
                </div>
                {errors.brand!=="" && (
                    <>
                    <IonLabel className="errText leftMargin" style={{"color":"darkorange"}}>{errors.brand}</IonLabel><br></br>
                    </>
                )}
                <br></br>


                <IonText className="smallHeading leftMargin">Address:</IonText>
                <IonButton mode="ios" expand="block" class="flex-margin" routerLink="/AddGymLocation" color="secondary">
                  <IonIcon  mode="ios" className="AddGymLocation" icon="location-outline"></IonIcon>
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
                {errors.address!=="" && (
                    <>
                    <IonLabel className="errText leftMargin" style={{"color":"darkorange"}}>{errors.address}</IonLabel><br></br>
                    </>
                )}

              <br></br>
              <IonButton
                mode="ios"
                class="AddGymAdd"
                color="warning"
                onClick={handleSubmit}
              >ADD</IonButton>
              <br></br><br></br>
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
      <IonLoading 
        mode="ios"
          isOpen={loading}
          duration={2000}
          spinner={"circles"}
          onDidDismiss={() => setLoading(false)}
          cssClass={"spinner"}
      />
      
      </IonContent>
    </IonPage>
  );
};

export default AddGym;
