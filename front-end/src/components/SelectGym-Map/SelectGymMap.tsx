import React, { useRef, useState } from "react";
import { Map, Overlay} from "pigeon-maps";
import { IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRow, IonSearchbar, useIonViewWillEnter, useIonViewWillLeave} from "@ionic/react";
import "./SelectGymMap.css"
import { stamenToner } from 'pigeon-maps/providers'
import { locate, location, lockClosed, lockOpen } from "ionicons/icons";
import Geocoder from "react-native-geocoding";
import { Geolocation } from '@ionic-native/geolocation';
import { useHistory } from "react-router-dom";

export function SelectGymMap() {

  const history=useHistory()

  const image:string="https://www.pngfind.com/pngs/m/219-2197153_gym-building-sport-training-svg-png-free-.png"

  const [center, setCenter] = useState([-25.7545 ,28.2314 ])
  const [gymCoord,setGymCoord]=useState([-25.7545 ,28.2314 ])
  const [zoom, setZoom] = useState(17)

  const modal = useRef<HTMLIonModalElement>(null);
  const [open,setOpen]=useState(true)

  const [gymAddress, setGymAddress] = useState<string>("address");
  const [addresses,setaddresses]=useState<any>([])
 
  const [icon,setIcon]=useState(lockClosed)
  const [lock,setLock]=useState(true)
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
      setIcon(lockClosed)
      setLock(true)
  })
  useIonViewWillLeave(()=>{
    setOpen(false)
  })

  function changeCoords(lat:number,long:number)
  {
    setCenter([lat,long]);
    setGymCoord([lat,long]);
  }
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
  return (
    <div>
    <Map
     provider={stamenToner}
     height={800}
     center={[center[0],center[1]]} 
     zoom={zoom}
     maxZoom={17}
     onBoundsChanged={({ center, zoom }) => { 
      if(!lock){
        setGymCoord([center[0],center[1]])
      }
      setZoom(zoom) 
      setCenter(center)
     }} >
       <Overlay anchor={[gymCoord[0],gymCoord[1]]} offset={[30,30]} >
          <img src={image} width={80} height={80} alt='building icon' />
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
                              onKeyDown={handleKeyDown} placeholder={"address"}></IonSearchbar>
                <IonButton color="warning"
                            onClick={()=>{
                              sessionStorage.setItem("gymAddress",gymAddress)
                              sessionStorage.setItem("Lat",String(gymCoord[0]))
                              sessionStorage.setItem("Long",String(gymCoord[1]))
                              history.goBack()
                            }}>Select</IonButton>
              </IonRow>
            </IonGrid>
            <IonList>
              <IonItem  onClick={()=>{
                          getLocation();
                          setGymAddress("Evander");
                          modal.current?.setCurrentBreakpoint(0.25)
                      }}>
               <IonIcon slot="start" icon={location}></IonIcon>
               <IonLabel>Use My Location</IonLabel>
              </IonItem>
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
            </IonList>
          </IonContent>
        </IonModal>
    </div>
  );
} 