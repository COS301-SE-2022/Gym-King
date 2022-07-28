/** 
* @file SelectGymMap.tsx
* @brief map component used by AddGymLocations.tsx
*/
import React, { useRef, useState } from "react";
import { Map, Overlay} from "pigeon-maps";
import { IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonItem, IonLabel, IonModal, IonRow, IonSearchbar, useIonViewWillEnter, useIonViewWillLeave} from "@ionic/react";
import "./SelectGymMap.css"
import { locate, location, lockClosed, lockOpen } from "ionicons/icons";
import Geocoder from "react-native-geocoding";
import { Geolocation } from '@ionic-native/geolocation';
import { useHistory } from "react-router-dom";
import image from '../../icons/gym.png'
/**
 * 
 * @returns SelectGymMap component
 */
export function SelectGymMap() {
//=================================================================================================
//    VARIABLES & HOOKS
//=================================================================================================
  //-history variable, this variables uses the useHistory from react-router to navigate
  const history=useHistory()
  //-height variable{number}, height value of the map
  let height:number=435;
  //-screenHeight variable{number}, screenHeight is stored and used to determine the value of the height variable
  let screenHeight:number=window.innerHeight;
    if(screenHeight>=840)
    {height=700;}
    else if(screenHeight>=740)
    {height=560;}
    else if(screenHeight>=650)
    {height=500;}
  //-centre hook [number,number],maintains the coordinates of the maps current centre
  const [center, setCenter] = useState([-25.7545 ,28.2314 ])
  //-gymCoord hook@brief [number,number], maintains coordinates of the gym
  const [gymCoord,setGymCoord]=useState([-25.7545 ,28.2314 ])
  //-zoom hook {number},stores value for maps zoom 
  const [zoom, setZoom] = useState(17)
  //-modal element,this component uses the IonModalElement
  const modal = useRef<HTMLIonModalElement>(null);
  //-open hook {boolean},determines wether modal is open or closed
  const [open,setOpen]=useState(true)
  //-gymAddress hook {string}, stores the address of the string
  const [gymAddress, setGymAddress] = useState<string>("address");
  //-addresses {string[]}, stores address list obtained from geocoder
  const [addresses,setaddresses]=useState<any>([])
  //-icon hook{icon}, seticon of the lockbutton
  const [icon,setIcon]=useState(lockClosed)
  //-lock {boolean}, determines whether map is locked on map or not
  const [lock,setLock]=useState(true)
//=================================================================================================
//    FUNCTIONS
//=================================================================================================
  /**
   * ionViewWilleEnter
   * @brief on component entry, gym address and coordinates will be taken from the sessionstorage and used to populate their relevant variables.model will be opened
   */
  useIonViewWillEnter(()=>{
    if(sessionStorage.getItem("gymAddress")!=null)
      {
        setGymAddress(sessionStorage.getItem("gymAddress") as string)
      }
      if(sessionStorage.getItem("Lat") !=null && sessionStorage.getItem("Long")!=null)
      {
        changeCoords(Number(sessionStorage.getItem("Lat")),Number(sessionStorage.getItem("Long")))
      }
      setOpen(true)
      setIcon(lockOpen)
      setLock(false)
  })
  /**
   * IonViewWillLeave
   * @brief on exit the modal will be closed
   */
  useIonViewWillLeave(()=>{
    setOpen(false)
  })
  /**
   * changeCoords function
   * @brief changes coordinates of center of map aswell as gym
   * @param {number} lat latitude coordinate
   * @param {number} long  longitude coordinate
   */
  function changeCoords(lat:number,long:number)
  {
    setCenter([lat,long]);
    setGymCoord([lat,long]);
  }
  /**
   * getLocation funtion
   * @brief gets the users location aswell as address
   */
  const getLocation = async() => {
    try {

        const position = await Geolocation.getCurrentPosition();
        changeCoords(position.coords.latitude, position.coords.longitude) 
        console.log("getting my coordinates")
    } catch(e){
        console.log(e)
    }
    console.log("using geocoding api");
    Geocoder.init("AIzaSyD9pQDwcGJFK6NRGNj5-YwdJBx2PtERCTg");
    Geocoder.from(gymCoord[0],gymCoord[1])
    .then((json) => {
        if(json.status==="OK")
        {
          setGymAddress(json.results[0].formatted_address)
        }
        })
        .catch((error) => console.warn(error));
}
/**
 * hadleKeyDown event
 * @brief detects an enter-key and then searched for address 
 * @param event 
 */
const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      console.log("enter was pressed")
      console.log("using geocoding api");
      Geocoder.init("AIzaSyD9pQDwcGJFK6NRGNj5-YwdJBx2PtERCTg");
      Geocoder.from(gymAddress)
        .then((json) => {
          if(json.status==="OK")
          {
            let arr=[]
            for(let i=0;i<json.results.length;i++){
                arr.push({
                  'id':json.results[i].place_id,
                  'address':json.results[i].formatted_address,
                  'lat':json.results[i].geometry.location.lat,
                  'long':json.results[i].geometry.location.lng
                })
            }
            setaddresses(arr)
          }
        })
        .catch((error) => console.warn(error));
    }
  };


  
  const mapTiler =(x: number, y: number, z: number, dpr?: number)=> {
    return `https://api.maptiler.com/maps/voyager/${z}/${x}/${y}.png?key=GhihzGjr8MhyL7bhR5fv`
  }
//=================================================================================================
//    FUNCTIONS
//=================================================================================================  
  return (
    <div>
    <Map
    
     provider={mapTiler}
     height={height}
     center={[center[0],center[1]]} 
     zoom={zoom}
     maxZoom={17.4}
     minZoom={13}
     onBoundsChanged={({ center, zoom }) => { 
      if(!lock){
        setGymCoord([center[0],center[1]])
      }
      setZoom(zoom) 
      setCenter(center)
     }} >
       <Overlay anchor={[gymCoord[0],gymCoord[1]]} offset={[15,31]} >
          <img src={image}  alt='building icon' id ="GymPicture"/>
        </Overlay>
    </Map>
    <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton 
              onClick={()=>{
                if(lock){
                  setLock(false);
                  setIcon(lockOpen)
                }
                else{
                  setLock(true);
                  setIcon(lockClosed)
                }
              }}>
            <IonIcon icon={icon} />
          </IonFabButton>
          <IonFabButton
            onClick={()=>{
              setCenter([gymCoord[0],gymCoord[1]])
            }}>
            <IonIcon icon={locate} />
          </IonFabButton>
        </IonFab>
    <IonModal
          ref={modal}
          trigger="open-modal"
          isOpen={open}
          initialBreakpoint={0.25}
          breakpoints={[0.25, 0.5, 0.75]}
          backdropDismiss={false}
          backdropBreakpoint={0.5}
        >
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonSearchbar onClick={() => modal.current?.setCurrentBreakpoint(0.75)} 
                              onIonChange={(e: any) => {
                                  setGymAddress(e.target.value);
                              }} 
                              onKeyDown={handleKeyDown} placeholder={"address"} value={gymAddress}></IonSearchbar>
              </IonRow>
              <IonRow>
                <IonButton  onClick={()=>{
                                          getLocation();
                                          setGymAddress(gymAddress);
                                          modal.current?.setCurrentBreakpoint(0.25)
                                      }}>
                              <IonIcon slot="start" icon={location}></IonIcon>
                              <IonLabel>Use My Location</IonLabel>
                                </IonButton>
              </IonRow>
              <IonRow>
                <IonButton color="warning"
                            onClick={()=>{
                              sessionStorage.setItem("gymAddress",gymAddress)
                              sessionStorage.setItem("Lat",String(gymCoord[0]))
                              sessionStorage.setItem("Long",String(gymCoord[1]))
                              history.goBack()
                            }}>Select</IonButton>
                
              </IonRow>
            </IonGrid>
            
              
                {
                  addresses.map((el:any)=>(
                      <IonItem key={el.id}
                        onClick={()=>{
                            changeCoords(el.lat,el.long);
                            setGymAddress(el.address);
                            modal.current?.setCurrentBreakpoint(0.25)
                        }}>
                          <IonIcon slot="start" icon={location}></IonIcon>
                        <IonLabel>{el.address}</IonLabel>
                      </IonItem>
                  )
                )}
            
          </IonContent>
        </IonModal>
    </div>
  );
} 