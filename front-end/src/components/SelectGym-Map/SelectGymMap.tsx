import React, { useState } from "react";
import { Map, Overlay} from "pigeon-maps";
import { IonFab, IonFabButton} from "@ionic/react";
import "./SelectGymMap.css"
import { stamenToner } from 'pigeon-maps/providers'
export function SelectGymMap() {


 
  const queryString=window.location.search
  const urlParams = new URLSearchParams(queryString);
  const name=urlParams.get('name')
  var y:number
  var x:number
  var latitude=urlParams.get('latitude')
  if(!latitude)
  { y=-25.7545 }
  else
  { y=parseFloat(latitude) }

  var longitude=urlParams.get('longitude')
  if(!longitude)
  { x= 28.2314 }
  else
  { x=parseFloat(longitude)}

  const [center, setCenter] = useState([y,x])
  const [zoom, setZoom] = useState(19)
  const href:string="http://localhost:3000/AddGym?name="+name+"&latitude="+center[0]+"&longitude="+center[1];


  return (
    <div>
    <Map
     provider={stamenToner}
     height={800}
     center={[center[0],center[1]]} 
     zoom={zoom} 
     onBoundsChanged={({ center, zoom }) => { 
       setCenter(center) 
       setZoom(zoom) 
     }} >
       <Overlay anchor={[center[0],center[1]]} offset={[30,30]} >
          <img src='https://icons-for-free.com/iconfiles/png/512/building-131994967665433893.png' width={50} height={50} alt='' />
        </Overlay>
    </Map>
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={href} class="SelectGymMapButton">
            Select
          </IonFabButton>
        </IonFab>
    </div>
  );
} 